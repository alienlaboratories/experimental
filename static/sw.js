//
// Copyright 2017 Alien Labs.
//

// Dev Tools > Application > Service Workers.
// chrome://inspect/#service-workers

console.log('SW Loaded.');

// Load config from server.
function initialize() {
  return fetch('/config').then(response => {
    response.json().then(config => {
      console.log('Loaded config: ' + JSON.stringify(config));

      importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
      importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

      firebase.initializeApp({
        messagingSenderId: config.messagingSenderId
      });

      firebase.messaging().setBackgroundMessageHandler(payload => {
        console.log('Message:', payload);
      });
    });
  });
}

self.addEventListener('install', function(event) {
  console.log('SW Initializing...');
  event.waitUntil(initialize().then(() => { console.log('Initialized.'); }));
});

self.addEventListener('activate', function(event) {
  console.log('SW Activating...');
});
