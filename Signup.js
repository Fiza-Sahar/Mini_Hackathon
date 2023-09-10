import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js"

// Initialize Firebase with your configuration

const auth = getAuth();
const database = getDatabase();
console.log('logging');

const signup = () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Create a new user with email and password
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed up successfully
            const user = userCredential.user;
            alert("Signed Up successfully....!")
            window.location.href = './login.html'
            console.log('User signed up:', user);

            // You can perform additional actions here, such as redirecting the user to another page.
        })
        .catch((error) => {
            // Handle errors during signup
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Signup error:', errorCode, errorMessage);
        });
};

// Attach the signup function to a signup button click event
const signupBtn = document.getElementById('signup-btn');
signupBtn.addEventListener('click', signup);