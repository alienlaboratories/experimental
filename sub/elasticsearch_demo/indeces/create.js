'use strict';

const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION });
AWS.config.setPromisesDependency(Promise);

const es = require('elasticsearch').Client({
  hosts: [ process.env.ES_DOMAIN ],
  connectionClass: require('http-aws-es')
});

function indexExists(name, client = es) {
  return client.indices.exists({
    index: name
  });
}

function buildMessage(statusCode, message) {
  return {
    statusCode: statusCode,
    headers: {'Content-Type': 'text/plain'},
    body: JSON.stringify({
      message: message,
    })
  };
}

function createIndex(name, client = es) {
  return client.indices.exists({
    index: name
  }).then(exists => {
    if (!exists) {
      return client.indices.create({
        index: name
      });
    }
  }).then(response => {
    return buildMessage(201, response);
  }).catch(error => {
    console.error(`error creating index ${name}: ${error}`);
    return buildMessage(500, `error creating index ${name}: ${error}`);
  });
}

module.exports.handler = (event, context, callback) => {
  console.log(JSON.stringify(event));

  const name = JSON.parse(event.body).name;
  console.log(name);
  callback(null, createIndex(name));
};
