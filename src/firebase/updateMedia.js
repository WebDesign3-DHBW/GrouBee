import firebase from "firebase/app";

export const updateMedia = async (docID, update) => {
  console.log(docID, update);
  try {
    const mediaRef = firebase.firestore().collection("Media").doc(docID);
    const res = await mediaRef.update(update);
    console.log("udpated", res);
  } catch (e) {
    console.error("Upsi", e);
  }
};
