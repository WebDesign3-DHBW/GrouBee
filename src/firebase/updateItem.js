import firebase from "firebase/app";

export const updateItem = async (docID, updateObj, collection) => {
  try {
    const mediaRef = firebase.firestore().collection(collection).doc(docID);
    await mediaRef.update(updateObj);
  } catch (e) {
    console.error("Upsi", e);
  }
};
