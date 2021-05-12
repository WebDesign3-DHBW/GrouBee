import firebase from "firebase/app";
import { getCurrentUser } from "./getCurrentUser";

export const removeGroupFromCurrentUser = async (groupID, allGroups) => {
  const currentUser = getCurrentUser();

  delete allGroups[groupID];

  if (!currentUser) return;
  await firebase.firestore().collection("User").doc(currentUser.id).update({ groups: allGroups });
};
