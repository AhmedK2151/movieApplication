// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signInAnonymously, setPersistence } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCctb-gcyuZjIy16B7SsYGKhhb99pBgkgY",
  authDomain: "movie-webapp-7e024.firebaseapp.com",
  projectId: "movie-webapp-7e024",
  storageBucket: "movie-webapp-7e024.appspot.com",
  messagingSenderId: "45182074221",
  appId: "1:45182074221:web:d84c01038b21915a0a6e64",
  measurementId: "G-XQK5SGJ01P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const analytics = getAnalytics(app);




function user1(){
    getUsers(db)
}

//New Sign Up

const auth = getAuth(app)

async function signUp(auth, email, password, chosenName) {

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user
      user.displayName = chosenName;
      console.log("You have signed up")
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage)
    })
}


//Sign In
async function signIn(auth, email, password){

}



//Authentication State
async function authCheck(auth) {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("Logged in")
      const uid = user.uid
    } else {
      console.log("User is signed out")
    }
  })
}

//Anonymous sign in
async function anonSignIn(auth) {
  signInAnonymously(auth)
  .then(() => {
    console.log("Signed in")
  })
  .catch((error) => {
    const errorCode = error.code
    const errorMessage = error.message
  })
}




export { user1, signUp, signIn, authCheck, anonSignIn, auth, firebaseConfig}