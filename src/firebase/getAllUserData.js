import firebase from "firebase/app";

export const getAllUserData = async () => {
  const snapshot = await firebase.firestore().collection("User").get();
  return snapshot.docs.map((doc) => doc.data());
};
