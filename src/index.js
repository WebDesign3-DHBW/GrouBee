import React from "react";
import ReactDOM from "react-dom";
import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/storage";
import "firebase/firestore";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB5ptUKjcLCoJbzfedvICdZOG8FZ_2xjAk",
  authDomain: "groubee-d2c79.firebaseapp.com",
  projectId: "groubee-d2c79",
  storageBucket: "groubee-d2c79.appspot.com",
  messagingSenderId: "752712566966",
  appId: "1:752712566966:web:0bfa5f849b7b63c5efbe17",
  measurementId: "G-RR5XNXJ62D",
};
// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
firebase.analytics();

firebase
  .firestore()
  .enablePersistence()
  .catch((e) => console.error(e));

export const storage = firebase.storage();
export const db = app.firestore();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
