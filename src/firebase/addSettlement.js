import firebase from "firebase/app";

export const addSettlement = async (entry) => {
  const { groupID, settleDate } = entry;
  firebase.firestore().collection("Settlement").doc(`${groupID}-${settleDate}`).set({
    groupID,
    settleDate,
  });
};
