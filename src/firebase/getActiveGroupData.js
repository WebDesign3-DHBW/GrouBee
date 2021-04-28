import firebase from "firebase/app";

/*
 * This function returns the page data based on active groups and the collection name
 */
export const getActiveGroupData = async (activeGroupIDs, collectionName) => {
  if (activeGroupIDs.length === 0) {
    return [];
  }
  try {
    let pageData = activeGroupIDs.map((groupID) =>
      firebase.firestore().collection(collectionName).where("groupID", "==", groupID).get()
    );

    const pageDataResolved = await Promise.all(pageData);

    if (pageDataResolved.every((data) => data.empty)) {
      console.log("No matching documents.");
      return [];
    }

    const pageDataArr = pageDataResolved.map((snapshot) => {
      if (!snapshot.empty) {
        return snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            // probably don't need this
            // but if, should be current user id
            createdBy: "Xq6qvtZxtdrtvpzIfIWP",
            // probably nedded later to update/delete the todo
            docId: doc.id,
          };
        });
      }
      console.log("Snapshot is empty");

      return [];
    });

    return pageDataArr.flat();
  } catch (e) {
    console.log("Something went really wrong ._.", e);
  }
};

// pretty buggy
// export const getActiveGroupData = async (allActiveGroupIDs, collectionName, setResult) => {
//   try {
//     let allTodos = [];
//     allActiveGroupIDs.map((groupID) =>
//       firebase
//         .firestore()
//         .collection(collectionName)
//         // This should later be replaced by the active group id
//         .where("groupID", "==", groupID)
//         .onSnapshot(
//           (querySnapshot) => {
//             setResult((prevState) => {
//               return [
//                 ...prevState,
//                 ...querySnapshot.docs.map((doc) => {
//                   console.log("aaaah??", doc.data());
//                   return {
//                     ...doc.data(),
//                     // probably don't need this
//                     // but if, should be current user id
//                     createdBy: "Xq6qvtZxtdrtvpzIfIWP",
//                   };
//                 }),
//               ];
//             });
//             console.log(`Received query snapshot of size ${querySnapshot.size}`);
//           },
//           (err) => {
//             console.log(`Encountered error: ${err}`);
//           }
//         )
//     );

//     return [];
//   } catch (e) {
//     console.log("Something went really wrong ._.", e);
//   }
// };

// low bob variante (backup)
