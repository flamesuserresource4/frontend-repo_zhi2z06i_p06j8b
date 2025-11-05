// Firebase client setup (optional). Ready for your config.
// 1) Add your Firebase project configuration below.
// 2) Uncomment the initialization to enable Firebase (Auth/Firestore).

// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
// import { getFirestore } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'YOUR_API_KEY',
//   authDomain: 'YOUR_AUTH_DOMAIN',
//   projectId: 'YOUR_PROJECT_ID',
//   storageBucket: 'YOUR_STORAGE_BUCKET',
//   messagingSenderId: 'YOUR_SENDER_ID',
//   appId: 'YOUR_APP_ID',
// };

// const app = initializeApp(firebaseConfig);
// export const auth = getAuth(app);
// export const db = getFirestore(app);

// Placeholder auth helpers (swap with real Firebase calls above)
export const loginWithEmail = async (email, password) => {
  // Replace with: await signInWithEmailAndPassword(auth, email, password)
  return { uid: 'demo-uid', email };
};

export const signupWithEmail = async (email, password) => {
  // Replace with: await createUserWithEmailAndPassword(auth, email, password)
  return { uid: 'demo-uid', email };
};

export const signOutUser = async () => {
  // Replace with: await signOut(auth)
  return true;
};

export const fetchUserData = async (uid) => {
  // Replace with Firestore reads: doc(db, 'users', uid)
  return {
    displayName: 'Alex Morgan',
    goals: ['Strength', 'Mobility'],
    stats: { calories: 620, water: 1.8, sleep: 7.4 },
  };
};
