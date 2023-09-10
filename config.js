
  // Import the functions you need from the SDKs you need
  import { initializeApp,   } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
  import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";

 
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD2dECEjUu0B84EvmuvJ20p91b2OzV4Jj0",
    authDomain: "minihackathon-7b9e8.firebaseapp.com",
    projectId: "minihackathon-7b9e8",
    databaseURL: "https://minihackathon-7b9e8-default-rtdb.europe-west1.firebasedatabase.app/",
    storageBucket: "minihackathon-7b9e8.appspot.com",
    messagingSenderId: "661461496392",
    appId: "1:661461496392:web:a7f4bb51f68f551adb5e7d",
    measurementId: "G-LYZ01E768R"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
console.log(app  , "________________________________")
  const database = getDatabase(app);
  
export {database}
