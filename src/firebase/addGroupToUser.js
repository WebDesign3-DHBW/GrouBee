import firebase from "firebase/app";
import { getCurrentUser } from "./getCurrentUser";

export const addGroupToUser = async (groups) => {
  const currentUser = getCurrentUser();
  firebase.firestore().collection("User").doc(currentUser.id).update({
    groups: groups,
  });
};
