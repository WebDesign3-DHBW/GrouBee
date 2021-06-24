import firebase from "firebase/app";
import { db } from "../index.js";

export const signUp = async (username, email, password) => {
  try {
    const userCreds = await firebase.auth().createUserWithEmailAndPassword(email, password);

    if (userCreds) {
      const user = userCreds.user;
      await db
        .collection("User")
        .doc(user.uid)
        .set(
          {
            userId: user.uid,
            userName: username,
            profileImage:
              "https://images.unsplash.com/photo-1600752384899-7d3dcbb2428c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&q=10",
            groups: {
              [user.uid]: { name: "ICH", color: "#eeeeee" },
            },
          },
          { merge: true }
        );
    }

    const user = firebase.auth().currentUser;
    const isMailSuccessful = user
      .sendEmailVerification()
      .then(function () {
        return true;
      })
      .catch(function (error) {
        alert("Fehler bei der Registrierung. Dir konnte kein Bestätigungslink gesendet werden.");
        return false;
      });

    const signOut = firebase
      .auth()
      .signOut()
      .then(function () {
        return true;
      })
      .catch(function (error) {
        alert("Fehler bei der Registrierung.");
        return false;
      });

    if (signOut) {
      return isMailSuccessful;
    } else {
      return false;
    }
  } catch (e) {
    throw new Error(e.code);
  }
};
