//
// Copyright 2017 Minder Labs.
//

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
