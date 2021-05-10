import firebase from "firebase/app";

export const addListEntry = async (media) => {
  const { title, date, group, userId, list } = media;
  firebase.firestore().collection("ToDo").doc().set({
    userId,
    date,
    done: "false",
    group,
    list,
    title,
  });
};
