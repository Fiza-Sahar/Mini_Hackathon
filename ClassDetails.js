import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Initialize Firebase with your configuration
const auth = getAuth();
const database = getDatabase();

console.log('logging');

document.addEventListener("DOMContentLoaded", function () {
    // Sample data structure to store class details
    const classDetails = [];

    // Function to add class details
    function addClass(event) {
        event.preventDefault();

        const selectedClass = document.getElementById("classSelect").value;
        const selectedSchedule = document.getElementById("scheduleSelect").value;
        const selectedTeacher = document.getElementById("teacherSelect").value;
        const selectedSection = document.getElementById("sectionSelect").value;
        const selectedCourse = document.getElementById("courseSelect").value;
        const selectedBatch = document.getElementById("batchSelect").value;

        const classObj = {
            class: selectedClass,
            schedule: selectedSchedule,
            teacher: selectedTeacher,
            section: selectedSection,
            course: selectedCourse,
            batch: selectedBatch,
        };

        // Generate a new unique key using ref and push the classObj to Firebase Realtime Database
        const classRef = ref(database, "classes"); // "classes" is the name of the collection/table
        const newClassRef = push(classRef);
        set(newClassRef, classObj)
            .then(() => {
                displayClassList();
                // Clear the form fields after adding
                document.getElementById("classForm").reset();
               
            })
            .catch(error => {
                console.error("Error adding document: ", error);
            });
    }

    // Function to display class details
    function displayClassList() {
        const classList = document.getElementById("classList");
        const ul = classList.querySelector("ul");
        ul.innerHTML = "";

        // Retrieve data from Firebase Realtime Database and display it
        const classRef = ref(database, "classes");
        onValue(classRef, (snapshot) => {
            const data = snapshot.val();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const classObj = data[key];
                    const li = document.createElement("li");
                    li.dataset.key = key; // Add data-key attribute
                    li.innerHTML = `
                        Class: ${classObj.class}<br>
                        Schedule: ${classObj.schedule}<br>
                        Teacher: ${classObj.teacher}<br>
                        Section: ${classObj.section}<br>
                        Course: ${classObj.course}<br>
                        Batch: ${classObj.batch}<br>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    `;
                    ul.appendChild(li);
                }
            }
        });
    }

    // Function to edit a class
    function editClass(key) {
        // You can implement the edit functionality if needed
        console.log("Edit class with key: ", key);
    }

    // Function to delete a class
    function deleteClass(key) {
        const classRef = ref(database, "classes", key);
        set(classRef, null)
            .then(() => {
                displayClassList();
            })
            .catch(error => {
                console.error("Error deleting document: ", error);
            });
    }

    // Attach event listener to the form
    const classForm = document.getElementById("classForm");
    classForm.addEventListener("submit", addClass);

    // Add event listeners to handle edit and delete actions
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const key = event.target.parentElement.dataset.key;
            editClass(key);
        } else if (event.target.classList.contains("delete-button")) {
            const key = event.target.parentElement.dataset.key;
            deleteClass(key);
        }
    });

    // Initial display of class list
    displayClassList();
});
document.addEventListener("DOMContentLoaded", function () {
    // Function to handle the click event for the "Student Details" button
    function redirectToStudentDetails() {
        // Redirect to studentdetails.html
        window.location.href = "./StudentsDetails.html";
    }

    // Attach event listener to the "Student Details" button
    const studentDetailsButton = document.getElementById("studentDetailsButton");
    studentDetailsButton.addEventListener("click", redirectToStudentDetails);
});
