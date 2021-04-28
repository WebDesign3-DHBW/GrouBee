import firebase from "firebase/app";

export const addGroupToUser = async (groups) => {
    firebase
        .firestore()
        .collection("User").doc("Xq6qvtZxtdrtvpzIfIWP").update({
            groups: groups
        });
};