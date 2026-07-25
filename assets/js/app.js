/* =====================================
   MOBILE MENU TOGGLE
===================================== */

const menuBtn = document.querySelector(".menu-btn");
const nav = document.querySelector("nav");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        nav.classList.toggle("show-menu");

        if (menuBtn.innerHTML.includes("bars")) {
            menuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        } else {
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
}

/* =====================================
   SCROLL TO TOP BUTTON
===================================== */

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", () => {

    if (window.scrollY > 300) {
        topBtn.style.display = "flex";
    } else {
        topBtn.style.display = "none";
    }

});

if (topBtn) {
    topBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* =====================================
   STICKY HEADER EFFECT
===================================== */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        header.style.boxShadow = "0 8px 25px rgba(0,0,0,.12)";
        header.style.background = "#ffffff";

    } else {

        header.style.boxShadow = "0 5px 20px rgba(0,0,0,.08)";
        header.style.background = "#ffffff";

    }

});

/* =====================================
   ACTIVE NAVIGATION LINK
===================================== */

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {

    link.addEventListener("click", () => {

        navLinks.forEach(item => item.classList.remove("active"));

        link.classList.add("active");

    });

});
/* =====================================
   FADE-IN ANIMATION ON SCROLL
===================================== */

const animatedElements = document.querySelectorAll(
    ".about, .manager, .why-card, .stat-box, .gallery-grid img, .notice-card, .contact"
);

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

        }

    });

}, {
    threshold: 0.15
});

animatedElements.forEach(el => {

    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all .8s ease";

    observer.observe(el);

});

/* =====================================
   GALLERY IMAGE EFFECT
===================================== */

const galleryImages = document.querySelectorAll(".gallery-grid img");

galleryImages.forEach(image => {

    image.addEventListener("mouseenter", () => {

        image.style.transform = "scale(1.05) rotate(1deg)";

    });

    image.addEventListener("mouseleave", () => {

        image.style.transform = "scale(1) rotate(0deg)";

    });

});

/* =====================================
   COUNTER ANIMATION
===================================== */

const counters = document.querySelectorAll(".stat-box h2");

let counterStarted = false;

function startCounters() {

    if (counterStarted) return;

    const statsSection = document.querySelector(".stats");

    if (!statsSection) return;

    const position = statsSection.getBoundingClientRect().top;

    if (position < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(counter => {

            const text = counter.innerText;
            const target = parseInt(text.replace(/\D/g, ""));
            const suffix = text.replace(/[0-9]/g, "");

            let count = 0;

            const speed = Math.max(10, Math.floor(2000 / target));

            const updateCounter = () => {

                if (count < target) {

                    count++;
                    counter.innerText = count + suffix;

                    setTimeout(updateCounter, speed);

                } else {

                    counter.innerText = target + suffix;

                }

            };

            updateCounter();

        });

    }

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* =====================================
   CURRENT YEAR IN FOOTER
===================================== */

const copyright = document.querySelector(".copyright");

if (copyright) {

    const year = new Date().getFullYear();

    copyright.innerHTML =
        `© ${year} Amichand Servoday Convent School. All Rights Reserved.`;

}

/* =====================================
   PAGE LOADED
===================================== */

window.addEventListener("load", () => {

    document.body.style.opacity = "1";

    console.log("Website Loaded Successfully!");

});