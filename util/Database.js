import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getFirestore,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

export const addToDatabase = async (object, collectionName, id) => {
  const usersCollection = collection(getFirestore(), collectionName);

  const userObject = doc(usersCollection, id);

  await setDoc(userObject, object);
};

export const updateDatabase = async (id, updateData, colName) => {
  const firestore = getFirestore();
  const collectionRef = collection(firestore, colName);
  const documentRef = doc(collectionRef, `${id}`);

  await updateDoc(documentRef, {
    flipCardsets: arrayUnion(updateData),
  });
};

export const deleteFromDatabase = async (id, colName) => {
  const col = collection(getFirestore(), colName);

  const document = doc(col, id);

  await deleteDoc(document);
};
