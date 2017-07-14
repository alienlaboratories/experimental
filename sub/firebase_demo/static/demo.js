//
// Copyright 2017 Alien Labs.
//

const clientId = Date.now();

window.addEventListener('load', () => {

  // Load custom servce worker.
  // NOTE: Must load from root.
  // NOTE: Only loaded on first call.
  // https://developers.google.com/web/fundamentals/getting-started/primers/service-workers
  // http://stackoverflow.com/questions/41659970/firebase-change-the-location-of-the-service-worker
  console.log('Loading SW...');
  navigator.serviceWorker.register('/sw.js').then(registration => {

    // Get config from page's <script> injected by server.
    const config = window.config;
    console.log('Config = ' + JSON.stringify(config, null, 2));

    // Init FB.
    firebase.initializeApp(config);

    // Shows SW has been activated.
    // https://firebase.google.com/docs/reference/js/firebase.messaging.Messaging#useServiceWorker
    firebase.messaging().useServiceWorker(registration);

    // Listen for messages.
    firebase.messaging().onMessage(data => {
      console.log('Received:', JSON.stringify(data));
    });

    // Get permissions.
    console.log('Requestion permission...');
    firebase.messaging().requestPermission().then(() => {
      console.log('Got permission.');

      // Get token.
      firebase.messaging().getToken().then(messageToken => {

        // Register client's messageToken with server.
        let data = { clientId: clientId, messageToken };
        console.log('Registering:', JSON.stringify(data));
        $.ajax('/register', {
          method: 'POST',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify(data)
        }).done(response => {
          console.log('Registered: ' + JSON.stringify(response));
        });
      });
    });
  });
});

// Errors:
// Event handler of 'push' event must be added on the initial evaluation of worker script.
// Event handler of 'pushsubscriptionchange' event must be added on the initial evaluation of worker script.
// Event handler of 'notificationclick' event must be added on the initial evaluation of worker script.

// Trigger push
function push() {
  $.ajax('/ping', {
    method: 'POST',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({ clientId })
  }).done(response => {
    console.log('Registered: ' + JSON.stringify(response));
  });
}
