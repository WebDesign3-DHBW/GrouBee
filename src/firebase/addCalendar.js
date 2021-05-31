import firebase from "firebase/app";

export const addCalendar = async (entry) => {
  const { date, time, groupID, isAppointment, title } = entry;
  firebase.firestore().collection("Calendar").doc().set({
    date,
    time,
    groupID,
    title,
    isAppointment,
  });
};
