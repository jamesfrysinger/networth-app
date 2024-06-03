// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { ISignInDetails } from "types/authorizationTypes";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Authenticate existing user sign-in
const signInWithEmailAndPasswordAuth = (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return {
        status: true,
        firebase: user.toJSON(),
      } as ISignInDetails;
    })
    .catch((error) => {
      return {
        status: false,
        firebase: error,
      } as ISignInDetails;
    });
};

// Register new user sign-up
const signUpWithEmailAndPassword = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((res: any) => {
      const user = res.user;
      console.log("User signed up:", user);
      sendEmailVerification(user);
      return user;
    })
    .catch((error: any) => {
      console.error("Error:", error.message);
    });
};

// Insert data into Firestore
const addDataToFirestore = (data: {
  name: {
    firstName: string;
    lastName: string;
  };
  uid: string;
  email: string;
}) => {
  const collectionRef = collection(db, "users");

  addDoc(collectionRef, data)
    .then((docRef) => {
      console.log("Document added with ID:", docRef.id);
      return docRef;
    })
    .catch((error) => {
      console.error("Error adding document:", error.message);
    });
};

// Get user data from firestore
// const colRef = collection(db, "users");
// getDocs(colRef)
//   .then((snapshot) =>
//     console.log(
//       "getDocs",
//       snapshot.docs.map((item) => item.data())
//     )
//   )
//   .catch((err) => console.error("getDocs error", err));

export {
  app,
  auth,
  signInWithEmailAndPasswordAuth,
  signUpWithEmailAndPassword,
  addDataToFirestore,
  analytics,
};
