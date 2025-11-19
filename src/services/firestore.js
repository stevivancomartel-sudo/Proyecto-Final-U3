import { db } from "../firebase";
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc 
} from "firebase/firestore";

// CREATE
export const createItem = async (data) => {
  const docRef = await addDoc(collection(db, "items"), data);
  return docRef.id;
};

// READ
export const getItems = async () => {
  const querySnapshot = await getDocs(collection(db, "items"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE
export const updateItem = async (id, newData) => {
  const docRef = doc(db, "items", id);
  await updateDoc(docRef, newData);
};

// DELETE
export const deleteItem = async (id) => {
  const docRef = doc(db, "items", id);
  await deleteDoc(docRef);
};
