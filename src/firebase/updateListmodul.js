import firebase from "firebase/app";

export const updateListmodul = async (taskId, state) => {
  try {
    await firebase.firestore().collection("ToDo").doc(taskId).update({ done: state });
  } catch (e) {
    console.error("Task update error", e);
  }
};
