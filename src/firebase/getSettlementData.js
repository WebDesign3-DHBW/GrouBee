import firebase from "firebase/app";

export const getSettlementData = async (ID) => {
  const snapshot = await firebase
    .firestore()
    .collection("Settlement")
    .where("groupID", "in", ID)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};
