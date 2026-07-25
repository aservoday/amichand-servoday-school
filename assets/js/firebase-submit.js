import { db } from "./firebase.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("admissionForm");

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    console.log("Form Submitted");

    try {

        const registrationNo = document.getElementById("registrationNumber").value;

        await setDoc(doc(db, "admissions", registrationNo), {

            registrationNo: registrationNo,
            createdAt: serverTimestamp()

        });

        console.log("Firestore Save Success");

        alert("Admission Submitted Successfully");

    } catch (error) {

        console.error("Firestore Error :", error);

        alert(error.message);

    }

});