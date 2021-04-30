import firebase from "firebase/app";
import { getCurrentUser } from "./getCurrentUser";

export const updateCurrentUserData = async (updates) => {
  const currentUser = getCurrentUser();

  if (!currentUser) return;
  await firebase.firestore().collection("User").doc(currentUser.id).update(updates);
};
