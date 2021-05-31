import firebase from "firebase/app";

export const addListEntry = async (listObj) => {
  const { title, date, groupID, assignedTo, list, color } = listObj;
  firebase.firestore().collection("ToDo").doc().set({
    assignedTo,
    date,
    done: false,
    groupID,
    color,
    list,
    title,
  });
};
