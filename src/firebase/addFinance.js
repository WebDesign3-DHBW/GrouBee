import firebase from "firebase/app";

export const addFinance = async (entry) => {
  const { title, expense, selectedDate, groupID, paidBy } = entry;
  firebase.firestore().collection("Finance").doc().set({
    title,
    expense,
    selectedDate,
    groupID,
    paidBy,
    status: "neu",
  });
};
