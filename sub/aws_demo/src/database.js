//
// Copyright 2017 Minder Labs.
//

import _ from 'lodash';

/**
 * Database interface.
 */
export class Database {

  /**
   * Insert items into database.
   * @param {[{ id, title }]} items
   */
  insert(items) {
    throw 'Not implemented';
  }

  /**
   * Query items by text.
   * @param {{ text }} query
   */
  query(query) {
    throw 'Not implemented';
  }
}

/**
 * Test in-memory database.
 */
export class MemoryDatabase extends Database {

  constructor() {
    super();

    // Index of items by ID.
    this._items = new Map();
  }

  insert(items) {
    return new Promise((resolve, reject) => {
      _.each(items, item => {
        console.assert(item.id);

        // Insert into store.
        this._items.set(item.id, item);
      });

      resolve(items);
    });
  }

  query(query) {
    let { text } = query;

    return new Promise((resolve, reject) => {
      let results = [];

      if (text) {
        text = text.toLocaleLowerCase();

        // Match query.
        this._items.forEach(item => {
          let { title } = item;
          if (title) {
            if (title.toLocaleLowerCase().indexOf(text)) {
              results.push(item);
            }
          }
        });
      }

      resolve(results);
    });
  }
}