//
// Copyright 2017 Minder Labs.
//

import _ from 'lodash';

import { Database } from './database';

/**
 * DynamoDB record store.
 */
class ItemStore {

  constructor() {

    // NoSQL/BigTable items by ID (key).
    this._itemById = new Map();
  }

  /**
   * Insert items into store.
   *
   * @param {[{ id, ... }]} items
   * @returns {Promise}
   */
  setItems(items) {
    return new Promise((resolve, reject) => {
      _.each(items, item => {
        console.assert(item.id);

        // Insert into store.
        this._itemById.set(item.id, item);
      });

      resolve(items);
    });
  }

  /**
   * Retrieve items by ID.
   *
   * @param {[{string}]} ids
   * @returns {Promise}
   */
  getItems(ids) {
    return new Promise((resolve, reject) => {
      resolve(_.map(ids, id => this._itemById.get(id)));
    });
  }
}

/**
 * Elasticsearch text index.
 */
class Index {

  static getTokens(text) {
    // TODO(burdon): Better tokenization.
    // Strip non-word characters and split by spaces.
    return _.compact(text.toLowerCase().replace(/[\W]+/g, ' ').split(' '));
  }

  constructor() {
    // Sets of item IDs by token (the index).
    this._itemIdSetByToken = new Map();

    // Array of tokens by item ID (to compute diffs).
    this._tokenSetByItemId = new Map();
  }

  /**
   * Update index by tokens.
   *
   * @param {[{ id, ... }]} items
   * @returns {Promise}
   */
  updateItems(items) {
    return new Promise((resolve, reject) => {
      _.each(items, item => {
        let { id, title='' } = item;

        let newTokens = Index.getTokens(title);

        // Remove old tokens from index.
        let oldTokens = this._tokenSetByItemId.get(id);
        this._tokenSetByItemId.set(id, newTokens);
        let removeTokens = _.filter(oldTokens, token => _.indexOf(newTokens, token) === -1);
        _.each(removeTokens, token => {
          let itemIdSet = this._itemIdSetByToken.get(token);
          if (itemIdSet) {
            itemIdSet.delete(id);
          }
        });

        // Add new tokens to index.
        _.each(newTokens, token => {
          let itemIdSet = this._itemIdSetByToken.get(token);
          if (!itemIdSet) {
            itemIdSet = new Set();
            this._itemIdSetByToken.set(token, itemIdSet);
          }

          itemIdSet.add(id);
        });
      });

      resolve(items);
    });
  }

  /**
   * Query by token.
   *
   * @param query
   * @returns {Promise}
   */
  queryItems(query) {
    return new Promise((resolve, reject) => {
      let { text } = query;

      let itemIds = new Set();
      let tokens = Index.getTokens(text);

      // Logical OR tokens.
      _.each(tokens, token => {
        let matchingItemIds = this._itemIdSetByToken.get(token);
        if (matchingItemIds) {
          itemIds = new Set([ ...itemIds, ...matchingItemIds ]);
        }
      });

      resolve(Array.from(itemIds.values()));
    });
  }
}

/**
 * Test in-memory database.
 */
export class MemoryDatabase extends Database {

  constructor() {
    super();

    // DynamoDB.
    this._store = new ItemStore();

    // Elasticsearch.
    this._index = new Index();
  }

  insert(items) {

    // Insert items into store.
    return this._store.setItems(items).then(items => {

      // Update the index.
      // NOTE: Lambda could subscribe to DynamoDB updates to update the index.
      return this._index.updateItems(items);
    });
  }

  query(query) {
    return new Promise((resolve, reject) => {

      // Get item IDs matching the query.
      this._index.queryItems(query).then(itemIds => {

        // Retrieve items for these IDs.
        resolve(this._store.getItems(itemIds));
      });
    });
  }
}
