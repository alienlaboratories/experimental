//
// Copyright 2017 Alien Labs.
//

import _ from 'lodash';

// TODO(burdon): Create AWSDatabase (with DynamoDB, Lambda, and Elasticsearch).

import { MemoryDatabase as Database } from './database';

test('Write then query store.', () => {

  const data = [
    {
      id: 'I-1',
      title: 'Hello Alien.'
    },
    {
      id: 'I-2',
      title: 'This should not match.'
    },
    {
      id: 'I-3',
      title: 'Alien is here.'
    }
  ];

  let db = new Database();

  return db.insert(data).then(items => {
    return db.query({ text: 'Alien' }).then(items => {

      // Expect 2 items to match.
      expect(items).toHaveLength(2);
    });
  });
});
