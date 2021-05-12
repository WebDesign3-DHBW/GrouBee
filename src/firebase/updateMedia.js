import firebase from "firebase/app";

export const updateMedia = async (docID, update) => {
  try {
    const mediaRef = firebase.firestore().collection("Media").doc(docID);
    await mediaRef.update(update);
  } catch (e) {
    console.error("Upsi", e);
  }
};
