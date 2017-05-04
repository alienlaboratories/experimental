//
// Copyright 2017 Alien Labs.
//

import bodyParser from 'body-parser';
import express from 'express';
import handlebars from 'express-handlebars';
import * as admin from 'firebase-admin';
import path from 'path';
import yaml from 'node-yaml';

async function loadConfig() {
  return await yaml.read(path.join(__dirname, 'conf/config.yml'));
}

loadConfig().then(config => {

  // https://firebase.google.com/docs/admin/setup
  admin.initializeApp({
    credential: admin.credential.cert(config.firebase_credentials)
  });

  let app = express();

  // JS, etc.
  app.use(express.static(path.join(__dirname, 'static')));

  // Parse POSTs.
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.engine('handlebars', handlebars({
    helpers: {
      json: obj => JSON.stringify(obj, null, 2)
    }
  }));
  app.set('view engine', 'handlebars');
  app.set('views', path.join(__dirname, 'views'));

  //
  // Serve app.
  //
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Demo',
      config: config.firebase
    })
  });

  //
  // Send SW configuration.
  //
  app.get('/config', (req, res) => {
    console.log('GET config...');
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(config.firebase));
  });

  let messageTokens = new Map();

  //
  // Register client.
  //
  app.post('/register', (req, res) => {
    let { clientId, messageToken } = req.body;

    console.log('Registered:', clientId, messageToken);
    messageTokens.set(clientId, messageToken);
    res.send({ status: 200 });
  });

  //
  // Push to client.
  //
  app.post('/ping', (req, res) => {
    let { clientId } = req.body;

    let messageToken = messageTokens.get(clientId);
    const data = { ts: String(Date.now()), message: 'pong' };

    console.log('Pushing:', clientId, JSON.stringify(data));
    admin.messaging().sendToDevice(messageToken, { data })
      .then(function(response) {
        console.log('Pushed:', response.successCount);
      });

    res.end();
  });

  console.log('http://localhost:3000');
  app.listen(3000);
});
