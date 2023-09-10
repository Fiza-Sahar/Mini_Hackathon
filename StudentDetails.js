import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Initialize Firebase with your configuration
const auth = getAuth();
const database = getDatabase();


console.log('logging');

document.addEventListener("DOMContentLoaded", function () {
    // Sample data structure to store student details
    const studentDetails = [];

    // Function to add student details
    function addStudent(event) {
        event.preventDefault();

        const studentName = document.getElementById("studentName").value;
        const fatherName = document.getElementById("fatherName").value;
        const rollNumber = document.getElementById("rollNumber").value;
        const contactNumber = document.getElementById("contactNumber").value;
        const cnicNumber = document.getElementById("cnicNumber").value;
        const courseName = document.getElementById("courseName").value;
        const assignedClass = document.getElementById("assignedClass").value;

        const studentObj = {
            studentName: studentName,
            fatherName: fatherName,
            rollNumber: rollNumber,
            contactNumber: contactNumber,
            cnicNumber: cnicNumber,
            courseName: courseName,
            assignedClass: assignedClass,
        };

        // Generate a new unique key using ref and push the studentObj to Firebase Realtime Database
        const studentRef = ref(database, "studentdetails"); // "studentdetails" is the name of the collection/table
        const newStudentRef = push(studentRef);
        set(newStudentRef, studentObj)
            .then(() => {
                displayStudentList();
                // Clear the form fields after adding
                document.getElementById("addStudentForm").reset();
            })
            .catch(error => {
                console.error("Error adding student: ", error);
            });
    }

    // Function to display student details
    function displayStudentList() {
        const studentList = document.getElementById("studentList");
        const ul = studentList.querySelector("ul");
        ul.innerHTML = "";

        // Retrieve data from Firebase Realtime Database and display it
        const studentRef = ref(database, "studentdetails");
        onValue(studentRef, (snapshot) => {
            const data = snapshot.val();
            for (const key in data) {
                if (data.hasOwnProperty(key)) {
                    const studentObj = data[key];
                    const li = document.createElement("li");
                    li.dataset.key = key; // Add data-key attribute
                    li.innerHTML = `
                        Student Name: ${studentObj.studentName}<br>
                        Father's Name: ${studentObj.fatherName}<br>
                        Roll Number: ${studentObj.rollNumber}<br>
                        Contact Number: ${studentObj.contactNumber}<br>
                        CNIC Number: ${studentObj.cnicNumber}<br>
                        Course Name: ${studentObj.courseName}<br>
                        Assigned Class: ${studentObj.assignedClass}<br>
                        <button class="edit-button">Edit</button>
                        <button class="delete-button">Delete</button>
                    `;
                    ul.appendChild(li);
                }
            }
        });
    }

    // Function to edit a student
    function editStudent(key) {
        // You can implement the edit functionality if needed
        console.log("Edit student with key: ", key);
    }

    // Function to delete a student
    function deleteStudent(key) {
        const studentRef = ref(database, "studentdetails", key);
        set(studentRef, null)
            .then(() => {
                displayStudentList();
            })
            .catch(error => {
                console.error("Error deleting student: ", error);
            });
    }

    // Attach event listener to the form
    const addStudentForm = document.getElementById("addStudentForm");
    addStudentForm.addEventListener("submit", addStudent);

    // Add event listeners to handle edit and delete actions
    document.addEventListener("click", function (event) {
        if (event.target.classList.contains("edit-button")) {
            const key = event.target.parentElement.dataset.key;
            editStudent(key);
        } else if (event.target.classList.contains("delete-button")) {
            const key = event.target.parentElement.dataset.key;
            deleteStudent(key);
        }
    });

    // Initial display of student list
    displayStudentList();
});
