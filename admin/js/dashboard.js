import { auth } from "../../assets/js/firebase-config.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const adminName = document.getElementById("adminName");
const logoutBtn = document.getElementById("logoutBtn");

// Dashboard Protection
onAuthStateChanged(auth, (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    adminName.textContent = user.email;

});

// Logout
logoutBtn.addEventListener("click", async (e) => {

    e.preventDefault();

    const confirmLogout = confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    try {

        await signOut(auth);

        alert("Logged out successfully.");

        window.location.href = "login.html";

    } catch (error) {

        alert(error.message);

    }

});