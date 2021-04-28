import firebase from "firebase/app";

export const getCurrentUserData = async () => {
  const userRef = firebase
    .firestore()
    .collection("User")
    // This should later be replaced by the real current user
    .doc("Xq6qvtZxtdrtvpzIfIWP");
  const doc = await userRef.get();
  if (!doc.exists) {
    console.log("No such document!");
  } else {
    return doc.data();
  }
};
