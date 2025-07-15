// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,         // ADD THIS
  createUserWithEmailAndPassword,     // ADD THIS
  signOut                             // ADD THIS
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAioe1ey0EG9ZbiZ5ppuZiyYr_DG06g4UQ",
  authDomain: "teacher-toolbox-app.firebaseapp.com",
  projectId: "teacher-toolbox-app",
  storageBucket: "teacher-toolbox-app.firebasestorage.app",
  messagingSenderId: "888087168438",
  appId: "1:888087168438:web:6e5986cdecccc5c743ed17",
  measurementId: "G-QKWBYGD4ZR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services and functions for use in other components
export {
  app,
  auth,
  db,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  signInWithEmailAndPassword,       // ADD THIS
  createUserWithEmailAndPassword,   // ADD THIS
  signOut,                         // ADD THIS
  doc,
  getDoc,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  collection,
  query,
  where,
  getDocs
};

export const APP_ID_FOR_FIRESTORE = "teacher-toolbox-app";
