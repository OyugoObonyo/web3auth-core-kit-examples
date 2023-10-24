// Import the functions you need from the SDKs you need
import { initializeApp, FirebaseApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth,
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsiXbOeYYVInjPDyyb7cBTt5OdsxjTVtk",
  authDomain: "web3-auth-demo.firebaseapp.com",
  projectId: "web3-auth-demo",
  storageBucket: "web3-auth-demo.appspot.com",
  messagingSenderId: "822599234515",
  appId: "1:822599234515:web:9290ba7395fe198e9f7526",
  measurementId: "G-2WZWXC002K",
};

export class FirebaseService {
  private readonly _firebaseApp: FirebaseApp;
  private readonly _firebaseAuth: Auth;

  constructor() {
    this._firebaseApp = initializeApp(firebaseConfig);
    this._firebaseAuth = getAuth(this._firebaseApp);
  }

  async registerWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        this._firebaseAuth,
        email,
        password
      );
      console.log(
        "User credentials from Firebase Method at sign up: ",
        userCredentials
      );
      const user = userCredentials.user;
      console.log(
        "Extracted User uid from user credentials at sign up: ",
        user.uid
      );
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

  async loginWithEmailAndPassword(email: string, password: string) {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        this._firebaseAuth,
        email,
        password
      );
      console.log(
        "User credentials from Firebase Method at sign in method: ",
        userCredentials
      );
      const user = userCredentials.user;
      console.log(
        "Extracted User uid from user credentials at sign in: ",
        user.uid
      );
      return user;
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }
}
// Initialize Firebase
