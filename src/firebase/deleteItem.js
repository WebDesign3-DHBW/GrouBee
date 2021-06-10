import firebase from "firebase/app";

export const deleteItem = async (docID, collection) => {
  try {
    await firebase.firestore().collection(collection).doc(docID).delete();
  } catch (e) {
    console.error("Upsi", e);
  }
};
