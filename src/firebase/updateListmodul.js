import firebase from "firebase/app";

export const updateListmodul = async (taskId, state) => {
  await firebase.firestore().collection("ToDo").doc(taskId).update(state);
};
