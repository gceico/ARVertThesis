import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


// use this on developing
// let serviceAccount = require('../../secret.json');
// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });

// use this on production
admin.initializeApp(functions.config().firebase);

export default admin.firestore();
export const auth = admin.auth();
