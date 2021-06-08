import firebase from "firebase/app";

export const getSettlementData = async (IDs) => {
  const activeGroupIDs = IDs.map((groupArr) => groupArr[0]);

  if (activeGroupIDs.length !== 0) {
    const snapshot = await firebase
      .firestore()
      .collection("Settlement")
      .where("groupID", "in", activeGroupIDs)
      .get();
    return snapshot.docs.map((doc) => doc.data());
  }
  return [];
};
