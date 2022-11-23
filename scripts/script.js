import { outputMovie } from "./getMovie.js";
import { firebaseConfig} from "./firebase"
import {  createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo, getAuth, onAuthStateChanged } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, getDocs } from "firebase/firestore"; 
import { authCheck } from "./firebase";
import { getUser } from "./loginPage.js";

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const currentUser = auth.currentUser

const searchBox = document.querySelector('input')
searchBox.addEventListener('keypress', function (e) {
    if(e.key === "Enter"){
        const input1 = document.querySelector('input').value
        outputMovie(input1)
    }
})

const topRightButton = document.querySelector(".topRightButton")
const topRightText = document.querySelector(".topRightButtonText")

async function first(auth) {
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const uid = user.uid
            console.log(uid)
            console.log(await getUser(user.email))
            topRightText.innerText = `User: ${await getUser(user.email).then((Username) => {return Username.Username})}`
        } else {
            topRightText.innerText = "Login"
            topRightButton.addEventListener("click", () => {
                location.href = ("/loginPage.html")
            })
        }
    })
}

first(auth)







