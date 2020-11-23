import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: "AIzaSyDQ_Ji1y-R15LlLH2q4jLpTTFHMaMzCgAc",
  authDomain: "movies-app-16c61.firebaseapp.com",
  databaseURL: "https://movies-app-16c61.firebaseio.com",
  projectId: "movies-app-16c61",
  storageBucket: "movies-app-16c61.appspot.com",
  messagingSenderId: "181723343549",
  appId: "1:181723343549:web:4f712b21963a66caef25d4",
  measurementId: "G-Q5QMT2GWSJ"
};


class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

  // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
}

export default Firebase;
