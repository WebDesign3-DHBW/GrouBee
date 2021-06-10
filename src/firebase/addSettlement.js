import firebase from "firebase/app";

export const addSettlement = async (entry) => {
  const { groupID, settleDate } = entry;
  firebase.firestore().collection("Settlement").doc().set({
    groupID,
    settleDate,
  });

  console.log("document successfully written");
};
