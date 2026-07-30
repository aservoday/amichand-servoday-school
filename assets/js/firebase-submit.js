import { db, storage } from "./firebase-config.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

const form = document.getElementById("admissionForm");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

/* -----------------------------
   Upload File to Firebase Storage
--------------------------------*/
async function uploadFile(file, folder, registrationNo) {

    if (!file) return "";

    const extension = file.name.split(".").pop();

    const storageRef = ref(
        storage,
        `${folder}/${registrationNo}_${Date.now()}.${extension}`
    );

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);
}
/* -----------------------------
   Get All Files
--------------------------------*/

async function uploadDocuments(registrationNo){

    return {

        studentPhoto: await uploadFile(
            document.getElementById("studentPhoto").files[0],
            "studentPhoto",
            registrationNo
        ),

        birthCertificate: await uploadFile(
            document.getElementById("birthCertificate").files[0],
            "birthCertificate",
            registrationNo
        ),

        studentAadhaar: await uploadFile(
            document.getElementById("studentAadhaar").files[0],
            "studentAadhaar",
            registrationNo
        ),

        fatherAadhaarFile: await uploadFile(
            document.getElementById("fatherAadhaarFile").files[0],
            "fatherAadhaar",
            registrationNo
        ),

        motherAadhaarFile: await uploadFile(
            document.getElementById("motherAadhaarFile").files[0],
            "motherAadhaar",
            registrationNo
        ),

        tcCertificate: await uploadFile(
            document.getElementById("tcCertificate").files[0],
            "tcCertificate",
            registrationNo
        ),

        reportCard: await uploadFile(
            document.getElementById("reportCard").files[0],
            "reportCard",
            registrationNo
        ),

        casteCertificate: await uploadFile(
            document.getElementById("casteCertificate").files[0],
            "casteCertificate",
            registrationNo
        ),

        incomeCertificate: await uploadFile(
            document.getElementById("incomeCertificate").files[0],
            "incomeCertificate",
            registrationNo
        ),

        medicalCertificate: await uploadFile(
            document.getElementById("medicalCertificate").files[0],
            "medicalCertificate",
            registrationNo
        )

    };

}
form.addEventListener("submit", async (e) => {

    e.preventDefault();

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

    try {

        const registrationNo = document.getElementById("registrationNumber").value;

        // Upload all documents
        const documents = await uploadDocuments(registrationNo);

        // Student Information
        const student = {
            registrationNo,
            studentClass: document.getElementById("studentClass").value,
            studentName: document.getElementById("studentName").value,
            studentDOB: document.getElementById("studentDOB").value,
            gender: document.getElementById("gender").value,
            bloodGroup: document.getElementById("bloodGroup").value,
            aadhaarNumber: document.getElementById("studentAadhaarNumber").value,
            nationality: document.getElementById("nationality").value,
            religion: document.getElementById("religion").value,
            category: document.getElementById("category").value,
            previousSchool: document.getElementById("previousSchool").value,
            presentAddress: document.getElementById("presentAddress").value,
            permanentAddress: document.getElementById("permanentAddress").value
        };

        // Father Information
        const father = {
            name: document.getElementById("fatherName").value,
            occupation: document.getElementById("fatherOccupation").value,
            qualification: document.getElementById("fatherQualification").value,
            aadhaar: document.getElementById("fatherAadhaar").value,
            mobile: document.getElementById("fatherMobile").value,
            whatsapp: document.getElementById("fatherWhatsapp").value,
            email: document.getElementById("fatherEmail").value,
            income: document.getElementById("fatherIncome").value,
            address: document.getElementById("fatherAddress").value
        };

        // Mother Information
        const mother = {
            name: document.getElementById("motherName").value,
            occupation: document.getElementById("motherOccupation").value,
            qualification: document.getElementById("motherQualification").value,
            aadhaar: document.getElementById("motherAadhaar").value,
            mobile: document.getElementById("motherMobile").value,
            whatsapp: document.getElementById("motherWhatsapp").value,
            email: document.getElementById("motherEmail").value,
            income: document.getElementById("motherIncome").value,
            address: document.getElementById("motherAddress").value
        };

        // Guardian Information
        const guardian = {
            name: document.getElementById("guardianName").value,
            relation: document.getElementById("guardianRelation").value,
            occupation: document.getElementById("guardianOccupation").value,
            mobile: document.getElementById("guardianMobile").value,
            email: document.getElementById("guardianEmail").value,
            address: document.getElementById("guardianAddress").value
        };

        // Declaration
        const declaration = {
            parentName: document.getElementById("parentName").value,
            relationship: document.getElementById("relationship").value,
            submitDate: document.getElementById("submitDate").value,
            place: document.getElementById("place").value,
            agreed: document.getElementById("declaration").checked
        };
                // Save to Firestore
        await setDoc(doc(db, "admissions", registrationNo), {

            registrationNo,

            student,
            father,
            mother,
            guardian,
            declaration,

            documents,

            status: "Pending",

            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()

        });

        // Success
        form.reset();

        successMessage.style.display = "block";

        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth"
        });

    } catch (error) {

        console.error(error);

        alert("Admission submission failed.\n\n" + error.message);

    } finally {

        submitBtn.disabled = false;

        submitBtn.innerHTML =
            '<i class="fa-solid fa-paper-plane"></i> Submit Admission Application';

    }

});