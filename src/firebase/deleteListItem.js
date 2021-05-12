import firebase from "firebase/app";

export const deleteListItem = async (taskId) => {
  try {
    await firebase.firestore().collection("ToDo").doc(taskId).delete();
  } catch (e) {
    console.error("Task delete error", e);
  }
};
