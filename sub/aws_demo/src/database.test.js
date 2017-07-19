//
// Copyright 2017 Alien Labs.
//

import _ from 'lodash';

// TODO(burdon): Create AWSDatabase (with DynamoDB, Lambda, and Elasticsearch).

import { MemoryDatabase as Database } from './memory';

test('Write then query store.', async () => {

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

  //
  // Insert data.
  //

  await db.insert(data);

  {
    let results = await db.query({ text: 'ALIEN' });
    expect(results).toHaveLength(2);
  }

  //
  // Update data and requery.
  //

  _.set(data, '[0].title', 'Bananas');

  await db.insert(data);

  {
    let results = await db.query({ text: 'ALIEN' });
    expect(results).toHaveLength(1);
  }

});
