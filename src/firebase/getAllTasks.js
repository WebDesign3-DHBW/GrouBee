import firebase from "firebase/app";

export const getAllTasks = async () => {
  const snapshot = await firebase.firestore().collection("ToDo").get();
  return snapshot.docs.map((doc) => doc.data());
};
