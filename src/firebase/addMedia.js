import firebase from "firebase/app";
import { getCurrentUser } from "./getCurrentUser";

export const addMedia = async (media) => {
  const { groupID, isMovie, title } = media;
  const currentUser = getCurrentUser();
  firebase.firestore().collection("Media").doc().set({
    groupID,
    title,
    isMovie,
    rating: 0,
    status: "neu",
    createdBy: currentUser.id,
  });
};
