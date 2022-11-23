import { firebaseConfig} from "./firebase"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAdditionalUserInfo, getAuth, onAuthStateChanged, setPersistence, browserSessionPersistence } from "firebase/auth"
import { initializeApp } from "firebase/app";
import { addDoc, collection, doc, getDoc, getFirestore, setDoc, getDocs } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const userAuth = auth.currentUser
const db = getFirestore(app)

async function setUserProfile(email, username) {
    const dbref = collection(db, "Users")
    await setDoc(doc(db, "Users", `${email}`), {
        Username: `${username}`
    })
    return true
}   

export async function getUser(email) {
    const docRef = doc(db, "Users", `${email}`)
    const docSnap = await getDoc(docRef)
    //console.log(docSnap.data())
    return docSnap.data()
}


async function signUpFunc(signUpBtn, toRemove){
    signUpBtn.addEventListener("click", async () => {

        await loginContainer.removeChild(toRemove)
        var container = document.createElement("section")
        container.classList.add("loginSubContainer")

        var inputContainer = document.createElement("section")
        inputContainer.classList.add("inputContainer")

        var usernameField = document.createElement("input")
        usernameField.classList.add("usernameField")
        usernameField.type = "text"
        usernameField.name = "usernameField"
        usernameField.placeholder = "Ahmed"
        var usernameLabel = document.createElement("label")
        usernameLabel.htmlFor = "usernameField"
        usernameLabel.innerText = "Please enter your username"

        var emailField = document.createElement("input")
        emailField.classList.add("emailField")
        emailField.type = "email"
        emailField.name = "emailField"
        emailField.placeholder = "email@gmail.com"
        var emailLabel = document.createElement("label")
        emailLabel.htmlFor = "emailField"
        emailLabel.innerText = "Please enter your Email"


        var passwordField = document.createElement("input")
        passwordField.classList.add("passwordField")
        passwordField.type = "password"
        passwordField.name = "passwordField"
        var passwordLabel = document.createElement("label")
        passwordLabel.htmlFor = "passwordField"
        passwordLabel.innerText = "Please enter your Password"
        passwordField.placeholder = "Password"

        var submit = document.createElement("button")
        submit.classList.add("submitButton")
        submit.innerText = "Submit"

        submit.addEventListener("click", async ()=> {
            setPersistence(auth, browserSessionPersistence)
            .then(()=> {
                return (createUserWithEmailAndPassword(auth, emailField.value, passwordField.value)
                .then(async (userCredential) => {
                    console.log(userCredential)
                    await setUserProfile(emailField.value, usernameField.value).then(async () => {
                        console.log((await getUser(emailField.value)))
                        document.location.href = "../public/index.html"
                    }).catch ((error) => {
                        console.log(error)
                    })
                }).catch((error) => {
                    const errorCode = error.code;
                    switch (errorCode) {
                        case "auth/email-already-exists":
                            alert("Email already in use")
                            break;
                        case "auth/invalid-email":
                            alert("Invalid email - check the format")
                            break;
                        case "auth/invalid-display-name":
                            alert("Please Enter a Name")
                            break;
                    }
            }))})
            .catch((error) => {
                const error2 = error.code
                console.log(error2)
            })
        })

        loginContainer.appendChild(inputContainer)
        inputContainer.appendChild(usernameLabel)
        inputContainer.appendChild(usernameField)
        inputContainer.appendChild(emailLabel)
        inputContainer.appendChild(emailField)
        inputContainer.appendChild(passwordLabel)
        inputContainer.appendChild(passwordField)
        inputContainer.appendChild(submit)

    })
}





async function signInFunc(signInBtn, toRemove){
    signInBtn.addEventListener("click", async () => {

        await loginContainer.removeChild(toRemove)

        var container1 = document.createElement("section")
        container1.classList.add("loginSubContainer")
        var container2 = document.createElement("section")
        container2.classList.add("loginSubContainer")

        var inputContainer = document.createElement("section")
        inputContainer.classList.add("inputContainer")

        var emailField = document.createElement("input")
        emailField.classList.add("emailField")
        emailField.type = "email"
        emailField.name = "emailField"
        emailField.placeholder = "email@gmail.com"
        var emailLabel = document.createElement("label")
        emailLabel.htmlFor = "emailField"
        emailLabel.innerText = "Please enter your Email"


        var passwordField = document.createElement("input")
        passwordField.classList.add("passwordField")
        passwordField.name = "passwordField"
        passwordField.type = "password"
        var passwordLabel = document.createElement("label")
        passwordLabel.htmlFor = "passwordField"
        passwordLabel.innerText = "Please enter your Password"
        passwordField.placeholder = "Password"

        var submit = document.createElement("button")
        submit.classList.add("submitButton")
        submit.innerText = "Submit"

        let registerLink = document.createElement("button")
        registerLink.classList.add("registerLink")
        registerLink.innerText = "Register?"
        registerLink.addEventListener("click", async () => {
            await signUpFunc(registerLink, inputContainer)
        })

        submit.addEventListener("click", async ()=> {
            // signIn(auth, emailField.value, passwordField.value)
            // console.log("User: " + auth.)
            setPersistence(auth, browserSessionPersistence)
            .then(()=> {
                return (signInWithEmailAndPassword(auth, emailField.value, passwordField.value)
                .then(async (userCredential) => {
                  const user = userCredential.user;
                  console.log("emailfield.value " + emailField.value) 
                  await getUser(emailField.value)
                  document.location.href = "../public/index.html"
                }).catch((error) => {
                  const errorCode = error.code;
                  switch (errorCode) {
                    case "auth/invalid-email":
                      alert("Invalid Email");
                      break;
                    case "auth/wrong-password":
                      alert("Invalid Password");
                      break;
                  }
                }))
            })
            .catch((error) => {
                const error1 = error.code
                console.log(error1)
            })
        })

        loginContainer.appendChild(inputContainer)
        inputContainer.appendChild(container1)
        container1.appendChild(emailLabel)
        container1.appendChild(emailField)
        inputContainer.appendChild(container2)
        container2.appendChild(passwordLabel)
        container2.appendChild(passwordField)
        inputContainer.appendChild(submit)
        inputContainer.appendChild(registerLink)

    })
}

const loginContainer = document.querySelector(".loginContainer")

async function loginLanding() {
    console.log(userAuth)
    await auth.signOut()

    const landingPageContainer = document.createElement("section")
    landingPageContainer.classList.add("lpContainer")

    var optionsContainer = document.createElement("section")
    optionsContainer.classList.add("optionsContainer")

    var signUpButton = document.createElement("button")
    signUpButton.classList.add("signUpButton")
    signUpButton.innerText = "Create Account"

    var signInButton = document.createElement("button")
    signInButton.classList.add("signInButton")
    signInButton.innerText = "Sign In"

    //Appending Stuff
    loginContainer.appendChild(landingPageContainer)
    landingPageContainer.appendChild(signInButton)
    landingPageContainer.appendChild(signUpButton)

    const signUpBtn = document.querySelector(".signUpButton")
    const signInBtn = document.querySelector(".signInButton")

    signUpFunc(signUpBtn, landingPageContainer)
    signInFunc(signInBtn, landingPageContainer)

    // onAuthStateChanged(auth, (user) => {
    //     if (user !== null) {
    //         console.log(`${user.displayName, user.uid} has logged in`)
    //         console.log(auth)
    //         //alert(`${user.displayName} has logged in`)
    //         return true
    //     } else {
    //         console.log("User has logged out")
    //     }
    // })
}


if(document.location.href.includes("loginPage.html")) {
    loginLanding()
}

