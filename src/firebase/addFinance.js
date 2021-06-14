import firebase from "firebase/app";

export const addFinance = async (entry) => {
  const { title, expense, groupID, paidBy, userName, profileImage } = entry;
  firebase
    .firestore()
    .collection("Finance")
    .doc()
    .set({
      title,
      expense,
      groupID,
      paidBy,
      userName,
      profileImage,
      currentDate: new Date().toISOString().split("T")[0],
    });
};
