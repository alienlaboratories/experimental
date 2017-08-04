//
// Copyright 2017 Alien Labs.
//

import request from 'request';

module.exports.hello = (event, context, callback) => {

  // TODO(burdon): Set API KEY in header and call GraphQL API.
  request.post({
    url: `https://app.robotik.io/hook/${process.env['ALIEN_WEBHOOK']}`
  }, (error, response, body) => {

    // TODO(burdon): Error handling.
    if (error) {
      callback(error);
      return;
    }

    // Use this code if you don't use the http event with the LAMBDA-PROXY integration
    // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Alien OK',
        input: event
      }),
    });
  });
};
