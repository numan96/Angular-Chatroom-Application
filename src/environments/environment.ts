// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'get-chatrooms',
    appId: '1:1031236257119:web:5b0b6f4aa417c6137e62ea',
    storageBucket: 'get-chatrooms.appspot.com',
    apiKey: 'AIzaSyBsRJd7ArZOiWwQwhiwCRs8GgF1iiY0Su8',
    authDomain: 'get-chatrooms.firebaseapp.com',
    messagingSenderId: '1031236257119',
  },
  production: false,
  apiUrl: 'https://us-central1-get-chatrooms.cloudfunctions.net',
  stream: {
    key: '47mbymansa89',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
