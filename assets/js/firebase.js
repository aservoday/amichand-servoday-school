// Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyCgLfJ5g62tBpzxqgcVqJqbTG4iAaG8mKU",
  authDomain: "amichand-servoday-school.firebaseapp.com",
  projectId: "amichand-servoday-school",
  storageBucket: "amichand-servoday-school.firebasestorage.app",
  messagingSenderId: "903488839627",
  appId: "1:903488839627:web:52fee7e10d39989960a04e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };