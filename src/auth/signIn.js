import firebase from "firebase/app";
import { signOut } from "./signOut";

export const signIn = async (email, password) => {
  const isSignInSuccessful = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      if (authUser.user.emailVerified) {
        const loginStatus = {
          successful: true,
        };
        return loginStatus;
      } else {
        const loginStatus = {
          successful: false,
          error: "email/notverified",
        };
        return loginStatus;
      }
    })
    .catch(function (e) {
      const loginStatus = {
        successful: false,
        error: e.code,
      };
      return loginStatus;
    });
  return isSignInSuccessful;
};

export const resendLink = async (email, password) => {
  await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      authUser.user.sendEmailVerification();
      signOut();
    })
    .catch(function (e) {
      alert("Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.");
      return false;
    });
  return true;
};

export const resetPassword = async (email) => {
  await firebase
    .auth()
    .sendPasswordResetEmail(email)
    .catch(function (e) {
      alert("Ein Fehler ist aufgetreten. Bitte versuche es später noch einmal.");
      return false;
    });
  return true;
};
