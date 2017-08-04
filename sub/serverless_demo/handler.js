//
// Copyright 2017 Alien Labs.
//

import request from 'request';

module.exports.hello = (event, context, callback) => {

  // TODO(burdon): Set API KEY in header.
  // TODO(burdon): Simulate API Hook.
  // curl -i -X POST https://app.robotik.io/hook/83CC572F-90DE-406F-ABFB-4C770C2381EB -H "Content-Type: application/json" -d ""

  request.post({
    url: `https://app.robotik.io/hook/${process.env['ALIEN_API_KEY']}`
  }, (error, response, body) => {

    // TODO(burdon): Error handling.
    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Alien Serverless OK: ' + process.env['ALIEN_API_KEY'],
        input: event
      }),
    });
  });
};
