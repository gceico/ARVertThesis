import {firebaseConfig} from "./secret";
import * as firebase from 'firebase'  // Should not be used elsewhere in the project
firebase.initializeApp(firebaseConfig);

export default firebase;