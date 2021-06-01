import firebase from "firebase/app";

export const removeAppointment = async (docID) => {
  try {
    await firebase.firestore().collection("Calendar").doc(docID).delete();
  } catch (e) {
    console.error("Upsi", e);
  }
};
