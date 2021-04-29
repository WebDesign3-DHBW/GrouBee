import firebase from "firebase/app";

export const signIn = async (email, password) => {
  const isSignInSuccessful = await firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((authUser) => {
      const loginStatus = {
        successful: true,
      };
      return loginStatus;
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
