import firebase from "firebase/app";

export const removeMedia = async (docID) => {
  try {
    await firebase.firestore().collection("Media").doc(docID).delete();
  } catch (e) {
    console.error("Upsi", e);
  }
};
