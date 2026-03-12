/**
 * Simple store for managing absences and users.
 * Uses localStorage for persistence.
 */

import { 
  collection, 
  onSnapshot, 
  addDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  getDocs,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useState, useEffect } from 'react';

export const useAttendanceStore = () => {
  const [absences, setAbsences] = useState([]);
  const [users, setUsers] = useState([]);

  // Real-time listener for users
  useEffect(() => {
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  // Real-time listener for absences
  useEffect(() => {
    const q = query(collection(db, 'absences'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const absencesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAbsences(absencesData);
    });
    return () => unsubscribe();
  }, []);

  const toggleAbsence = async (userId, date) => {
    const q = query(collection(db, 'absences'), where('userId', '==', userId), where('date', '==', date));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      // Remove if exists
      const docId = snapshot.docs[0].id;
      await deleteDoc(doc(db, 'absences', docId));
    } else {
      // Add if doesn't exist
      await addDoc(collection(db, 'absences'), { userId, date, type: 'full' });
    }
  };

  const addUser = async (name, color) => {
    await addDoc(collection(db, 'users'), { name, color });
  };

  const updateUser = async (userId, name, color) => {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, { name, color });
  };

  const deleteUser = async (userId) => {
    // Delete user
    await deleteDoc(doc(db, 'users', userId));
    
    // Clean up their absences
    const q = query(collection(db, 'absences'), where('userId', '==', userId));
    const snapshot = await getDocs(q);
    const deletePromises = snapshot.docs.map(d => deleteDoc(doc(db, 'absences', d.id)));
    await Promise.all(deletePromises);
  };

  return { absences, users, toggleAbsence, addUser, updateUser, deleteUser };
};
