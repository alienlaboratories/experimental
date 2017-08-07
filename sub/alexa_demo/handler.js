//
// Copyright 2017 Alien Labs.
//

import _ from 'lodash';
import Alexa from 'alexa-sdk';
import request from 'request';

// TODO(burdon): Export const.
// http://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-handler.html
// https://github.com/alexa/skill-sample-nodejs-fact/blob/master/src/index.js

//
// NOTE: Must be at the root level.
//
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
    console.log('### Alexa Event ###\n', JSON.stringify(event, null, 2));

    // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs
    // https://github.com/serverless/examples/tree/master/aws-node-alexa-skill
    let alexa = Alexa.handler(event, context, callback);

    // TODO(burdon): Only set in prod? (otherwise "applicationId")
    // https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs/issues/165
    // The applicationIds don't match: applicationId and amzn1.ask.skill.720c3e80-76ae-457a-a3af-c2195894126f
//  alexa.appId = process.env['ALEXA_APP_ID'];

    alexa.registerHandlers({

      'LaunchRequest': () => {
        alexa.emit('HelloIntent');
      },

      'HelloIntent': () => {
        alexa.emit(':tellWithCard', 'hello!');
      },

      'StatusIntent': () => {

        // TODO(burdon): Error handling.
        // TODO(burdon): Authenticate with API_KEY.
        console.log('Calling API...');
        request.get({
          url: 'https://app.alienlabs.io/status'
          // url: `https://app.robotik.io/hook/${process.env['ALIEN_WEBHOOK']}`
        }, (error, response, body) => {
          if (error) {
            alexa.emit('Error');
          }

          let data = JSON.parse(body);

          alexa.emit(':tellWithCard', 'everything looks good. version ' + _.get(data, 'version', 'unknown'));
        });
      },

      'Error': () => {
        alexa.emit(':tell', 'sorry. something went wrong.');
      },

      'AMAZON.HelpIntent': () => {
        alexa.emit(':ask', 'how can i help?');
      },

      'AMAZON.CancelIntent': () => {
        alexa.emit(':tell', 'OK cancelled');
      },

      'AMAZON.StopIntent': () => {
        alexa.emit(':tell', 'OK stopped');
      },

      'Unhandled': () => {
        alexa.emit('AMAZON.HelpIntent');
      }

    });

    alexa.execute();
  }
};
