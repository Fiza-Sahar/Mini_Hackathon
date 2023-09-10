import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"

// Initialize Firebase with your configuration

const auth = getAuth();
const database = getDatabase();

console.log('logging');



const login = () => {
    let email = document.getElementById("email")
    let password = document.getElementById("password")
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((resolve) => {
            alert("successfully Login")
            let uniqueId = auth.currentUser.uid
            console.log(uniqueId);
            window.location.href = './ClassDetails.html'
            let userReference = ref(database, "users/" + uniqueId)


            onValue(userReference, (snapshot) => {
                console.log(snapshot.val());
                let username = document.getElementById("userName")
                username.innerHTML = snapshot.val().name;
                let imageElement = document.getElementById("profilePic")
                imageElement.src = snapshot.val().imageUrl
            })
        }).catch((reject) => {
            alert(reject)
        })
}


let login_btn = document.getElementById("login-button")

login_btn.addEventListener("click", login)


