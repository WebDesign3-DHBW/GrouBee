import firebase from "firebase/app";

export const addFinance = async (entry) => {
  const { title, expense, groupID, paidBy } = entry;
  firebase
    .firestore()
    .collection("Finance")
    .doc()
    .set({
      title,
      expense,
      groupID,
      paidBy,
      currentDate: new Date().toISOString().split("T")[0],
    });
};
