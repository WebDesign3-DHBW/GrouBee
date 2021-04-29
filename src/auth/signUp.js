import firebase from "firebase/app";
import { db } from "../index.js";

export const signUp = async (username, email, password) => {
  try {
    const userCreds = await firebase.auth().createUserWithEmailAndPassword(email, password);

    if (userCreds) {
      const user = userCreds.user;
      await db.collection("User").doc(user.uid).set(
        {
          userId: user.uid,
          userName: username,
        },
        { merge: true }
      );
      return true;
    }
  } catch (e) {
    throw new Error(e.code);
  }
};
