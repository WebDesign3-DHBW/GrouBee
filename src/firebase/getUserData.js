import firebase from "firebase/app";

export const getUserData = async (userId) => {
  const userInfoDoc = await firebase.firestore().collection("User").doc(userId).get();

  const userInfo = userInfoDoc.data();

  if (!userInfo) return null;

  return {
    ...userInfo,
    id: userInfoDoc.id,
  };
};
