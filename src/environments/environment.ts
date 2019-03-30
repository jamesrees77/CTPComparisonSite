// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyB2dAlrJJMXQCjskelxPdDeavZFlF80h4c",
    authDomain: "lendycompare.firebaseapp.com",
    databaseURL: "https://lendycompare.firebaseio.com",
    projectId: "lendycompare",
    storageBucket: "lendycompare.appspot.com",
    messagingSenderId: "201348072960"
  },
  algolia: {
    appId: 'SXINQ9YIRL',
    apiKey: '3a05968099d5140e9d8e7a57c532e6dc',
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
