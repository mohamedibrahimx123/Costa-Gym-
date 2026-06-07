// src/hooks/useFirestore.js
// Reusable custom hooks for all Firestore operations

import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '../lib/firebase';

// ─── Generic collection hook with real-time listener ──────────────────────────
export function useCollection(collectionName, constraints = []) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const ref = collection(db, collectionName);
    const q = constraints.length > 0 ? query(ref, ...constraints) : ref;

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
        setData(docs);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [collectionName]);

  return { data, loading, error };
}

// ─── Add document ──────────────────────────────────────────────────────────────
export async function addDocument(collectionName, data) {
  const ref = collection(db, collectionName);
  return await addDoc(ref, {
    ...data,
    createdAt: serverTimestamp(),
  });
}

// ─── Update document ───────────────────────────────────────────────────────────
export async function updateDocument(collectionName, docId, data) {
  const ref = doc(db, collectionName, docId);
  return await updateDoc(ref, {
    ...data,
    updatedAt: serverTimestamp(),
  });
}

// ─── Delete document ───────────────────────────────────────────────────────────
export async function deleteDocument(collectionName, docId) {
  const ref = doc(db, collectionName, docId);
  return await deleteDoc(ref);
}

// ─── Check duplicate phone in competition entries ─────────────────────────────
export async function checkDuplicatePhone(phone, competitionId = null) {
  const ref = collection(db, 'competition_entries');
  const constraints = [where('phone', '==', phone)];
  if (competitionId) constraints.push(where('competitionId', '==', competitionId));
  const q = query(ref, ...constraints);
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

// ─── Get all docs once (for export/winner selection) ──────────────────────────
export async function getAllDocs(collectionName, constraints = []) {
  const ref = collection(db, collectionName);
  const q = constraints.length > 0 ? query(ref, ...constraints) : ref;
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}
