import firebase from "firebase/app";
import { getCurrentUser } from "./getCurrentUser";

export const addMedia = async (media) => {
  const { groupID, isMovie, title, color } = media;
  const currentUser = getCurrentUser();
  firebase.firestore().collection("Media").doc().set({
    groupID,
    color,
    title,
    isMovie,
    rating: 0,
    status: "neu",
    createdBy: currentUser.id,
  });
};
