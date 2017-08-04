//
// Copyright 2017 Alien Labs.
//

import Alexa from 'alexa-sdk';

// TODO(burdon): Export const.
// http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
// https://github.com/alexa/skill-sample-nodejs-fact/blob/master/src/index.js

module.exports = {

  hello: (event, context, callback) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    callback(null, {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Alien OK',
        input: event
      }),
    });
  },

  alexa: (event, context, callback) => {
    console.log('Event:', JSON.stringify(event, null, 2));

    // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
    let alexa = Alexa.handler(event, context, callback);

    // TODO(burdon): Only set in prod?
    // The applicationIds don't match: applicationId and amzn1.ask.skill.720c3e80-76ae-457a-a3af-c2195894126f
//  alexa.appId = process.env['ALEXA_APP_ID'];

    alexa.registerHandlers({

      'LaunchRequest': () => {
        alexa.emit('StatusIntent');
      },

      'StatusIntent': () => {
        alexa.emit(':tellWithCard', 'hello!');
      },

      'AMAZON.HelpIntent': () => {
        alexa.emit(':ask', 'how can i help?');
      },

      'AMAZON.CancelIntent': () => {
        alexa.emit(':tell', 'bye');
      },

      'AMAZON.StopIntent': () => {
        alexa.emit(':tell', 'bye');
      },

      'Unhandled': () => {
        alexa.emit(':ask', 'how can i help?');
      }

    });

    alexa.execute();
  }
};

  // import request from 'request';
  // request.post({
  //   url: `https://app.robotik.io/hook/${process.env['ALIEN_WEBHOOK']}`
  // }, (error, response, body) => {});
