import {
  getFirestore,
  collection,
  doc,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { initApp } from "./index";

initApp();

const db = getFirestore();

const createOne = async ({ collectionName, id, data }) => {
  try {
    const timeStamp = Date.now();

    await setDoc(doc(db, collectionName, id), {
      ...data,
      created: timeStamp,
    });

    return { id: id, ...data };
  } catch (error) {
    return { error: error.message };
  }
};

const createOneAutoId = async ({ collectionName, data }) => {
  try {
    const timeStamp = Date.now();

    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      created: timeStamp,
    });

    const posted = await getDoc(docRef);

    return { id: posted.id, ...posted.data() };
  } catch (error) {
    return { error: error.message };
  }
};

const updateOne = async ({ collectionName, id, data }) => {
  try {
    const timeStamp = Date.now();

    await updateDoc(doc(db, collectionName, id), {
      ...data,
      updated: timeStamp,
    });

    return { id: id, ...data };
  } catch (error) {
    return { error: error.message };
  }
};

const deleteOne = async ({ collectionName, id }) => {
  try {
    await deleteDoc(doc(db, collectionName, id));

    return { id };
  } catch (error) {
    return { error: error.message };
  }
};

const getOneDoc = async ({ collectionName, id }) => {
  try {
    const docSnap = await getDoc(doc(db, collectionName, id));
    if (!docSnap.exists()) {
      return { error: "Document does not exist.", exists: false };
    }

    return { ...docSnap.data(), exists: true };
  } catch (error) {
    return { error: error.message, exists: true };
  }
};

export const getDocsByUid = async ({ collectionName, uid }) => {
  let docs = [];

  const q = query(
    collection(db, collectionName),
    where("uid", "==", uid),
    orderBy("created", "desc")
  );

  try {
    const snapShot = await getDocs(q);
    snapShot.forEach((doc) => docs.push({ id: doc.id, ...doc.data() }));
    return { docs };
  } catch (error) {
    console.log(error);
    return { error: error.message };
  }
};

export const fbStore = {
  createOne: createOne,
  createOneAutoId: createOneAutoId,
  updateOne: updateOne,
  deleteOne: deleteOne,
  getOneDoc: getOneDoc,
  getDocsByUid: getDocsByUid,
};
