import { initializeApp } from "firebase/app";
import {
  collection,
  getFirestore,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD3QmjByLmnsFlNXxcj-grfXNvKvsjI87g",
  authDomain: "fruits-af866.firebaseapp.com",
  projectId: "fruits-af866",
  storageBucket: "fruits-af866.appspot.com",
  messagingSenderId: "413227097855",
  appId: "1:413227097855:web:8a1563f2afc4e5075df6ca",
  measurementId: "G-2EW9CMCDTX",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

// Read data

const ref = collection(db, "fruits");

onSnapshot(ref, (snapshot) => {
  const fruits = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  console.log("Fruits:", fruits);
});

// Write data (add)

const addForm = document.getElementById("add");

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const fruit = {
    name: addForm.name.value,
    color: addForm.color.value,
    emoji: addForm.emoji.value,
  };
  addDoc(ref, fruit)
    .then(() => {
      alert("Erfolgreiche hinzugefügt.");
    })
    .catch((error) => {
      alert(error);
    });
});

// Delete data

const deleteForm = document.getElementById("delete");
deleteForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(db, "fruits", deleteForm.id.value);
  deleteDoc(docRef)
    .then(() => {
      alert("Erfolgreiche gelöscht!");
    })
    .catch((error) => {
      alert("Error:", Error);
    });
});

// Update Data

const updateForm = document.getElementById("update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = updateForm.id.value;
  const fruit = {
    name: updateForm.name.value,
    color: updateForm.color.value,
    emoji: updateForm.emoji.value,
  };
  const docRef = doc(db, "fruits", id);
  updateDoc(docRef, fruit)
    .then(() => {
      alert("Erfolgreiche Updated");
    })
    .catch((error) => {
      alert("Error:", error);
    });
});

//SignupButton

const divFruit = document.getElementById("divFruit");
const divAuth = document.getElementById("divAuth");

const signupButton = document.getElementById("signupButton");
signupButton.addEventListener("click", (e) => {
  e.preventDefault();
  divFruit.style.display = "none";
  divAuth.style.display = "block";
  signupButton.style.display = "none";
});

// Sign up

const signupForm = document.getElementById("signup");
const signout = document.getElementById("signout");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User signed up", user);
      divAuth.style.display = "none";
      signupButton.style.display = "none";
      divFruit.style.display = "block";
      signout.style.display = "block";
    })
    .catch((error) => {
      console.log("Error:", error);
    });
});

//Sign Out

signout.addEventListener("click", (e) => {
  e.preventDefault();
  signOut(auth)
    .then(() => {
      divFruit.style.display = "none";
      divAuth.style.display = "block";
      signupButton.style.display = "block";
      signout.style.display = "none";
      console.log("User signed out");
    })
    .catch((error) => {
      console.log(error);
    });
});

// Sign in

const signinForm = document.getElementById("signin");
signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signinForm.email.value;
  const password = signinForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      console.log("User loggined in", user);
      divAuth.style.display = "none";
      divFruit.style.display = "block";
      signout.style.display = "flex";
    })
    .catch((error) => {
      console.log(error);
    });
});

// auth state change listener

onAuthStateChanged(auth, (user) => {
  if (!user) {
    console.log("the user has logged out");
  } else {
    console.log("an user is exists", user);
  }
});
