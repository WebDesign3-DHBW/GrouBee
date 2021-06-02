import firebase from "firebase/app";

export const getSettlementData = async (IDs) => {
  const snapshot = await firebase
    .firestore()
    .collection("Settlement")
    .where("groupID", "in", IDs)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};
