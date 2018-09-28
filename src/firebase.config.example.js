import * as Firebase from 'firebase';

// INIT APPLICATION INSTANCE
export default Firebase.apps.length
  ? Firebase.app()
  : Firebase.initializeApp({
    messagingSenderId: '',
    storageBucket: '',
    databaseURL: '',
    authDomain: '',
    projectId: '',
    apiKey: '',
  });
