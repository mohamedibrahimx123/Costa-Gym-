// ============================================
// Firebase Configuration
// src/lib/firebase.js
//
// SETUP INSTRUCTIONS:
// 1. Go to https://console.firebase.google.com
// 2. Create a new project
// 3. Add a Web App to the project
// 4. Copy your config values into .env file
// 5. Enable Authentication (Email/Password)
// 6. Enable Firestore Database
// 7. Deploy Firestore Security Rules (see rules below)
// ============================================

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;

// ============================================
// FIRESTORE SECURITY RULES
// Copy these to Firebase Console > Firestore > Rules
// ============================================
/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Public can read offers and competitions
    match /offers/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    match /competitions/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Public can create trial registrations, admin can read/delete
    match /trial_registrations/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }

    // Public can create membership registrations, admin can read/delete
    match /membership_registrations/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }

    // Public can create competition entries, admin can read/delete
    match /competition_entries/{doc} {
      allow create: if true;
      allow read, delete: if request.auth != null;
    }

    // Only admin can manage winners
    match /winners/{doc} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
*/
