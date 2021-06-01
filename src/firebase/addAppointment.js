import firebase from "firebase/app";

export const addAppointment = async (entry) => {
  // const { date, time, groupID, color, isAppointment, title } = entry;
  firebase.firestore().collection("Calendar").doc().set({
    date: "2021-06-05",
    time: "11:00",
    groupID: "_ce1e9ysxe",
    color: "#24fc03",
    title: "Wichtiges Date ⚜",
  });
};
