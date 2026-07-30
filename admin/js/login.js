import { auth } from "../../assets/js/firebase-config.js";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const message = document.getElementById("message");
const togglePassword = document.getElementById("togglePassword");
const loginBtn = document.querySelector(".login-btn");

// Already logged in? -> Dashboard
onAuthStateChanged(auth, (user) => {
    if (user) {
        window.location.href = "dashboard.html";
    }
});

// Show / Hide Password
togglePassword.addEventListener("click", () => {

    if (password.type === "password") {
        password.type = "text";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye-slash"></i>';
    } else {
        password.type = "password";
        togglePassword.innerHTML = '<i class="fa-solid fa-eye"></i>';
    }

});

// Login
loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    message.innerHTML = "";
    loginBtn.disabled = true;
    loginBtn.innerHTML =
        '<i class="fa-solid fa-spinner fa-spin"></i> Logging in...';

    try {

        await signInWithEmailAndPassword(
            auth,
            email.value.trim(),
            password.value
        );

        message.style.color = "#22c55e";
        message.innerHTML = "Login Successful...";

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 700);

    } catch (error) {

        message.style.color = "#ef4444";

        switch (error.code) {

            case "auth/invalid-email":
                message.innerHTML = "Invalid email address.";
                break;

            case "auth/user-not-found":
                message.innerHTML = "Admin account not found.";
                break;

            case "auth/wrong-password":
            case "auth/invalid-credential":
                message.innerHTML = "Incorrect email or password.";
                break;

            case "auth/too-many-requests":
                message.innerHTML = "Too many attempts. Please try again later.";
                break;

            default:
                message.innerHTML = error.message;
        }

    }

    loginBtn.disabled = false;
    loginBtn.innerHTML =
        '<i class="fa-solid fa-right-to-bracket"></i> Login';

});