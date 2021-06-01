import firebase from "firebase/app";

export const addAppointment = async (entry) => {
  // const { date, time, groupID, color, isAppointment, title } = entry;
  firebase.firestore().collection("Calendar").doc().set({
    date: "2021-06-05",
    time: "10:00",
    groupID: "_ce1e9ysxe",
    color: "ff00ff",
    title: "APPOINTMENT",
  });
};
