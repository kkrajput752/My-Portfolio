
// ====================================
// INTRO ANIMATION
// ====================================

const intro = document.getElementById("intro");

window.addEventListener("load", () => {
    setTimeout(() => {
        intro.style.display = "none";
    }, 4100);
});


// ====================================
// DARK AND LIGHT MODE
// ====================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
    document.body.classList.replace("dark", "light");
    themeToggle.textContent = "🌙 Dark";
}

themeToggle.addEventListener("click", () => {

    const isLight = document.body.classList.toggle("light");

    document.body.classList.toggle("dark", !isLight);

    themeToggle.textContent = isLight
        ? "🌙 Dark"
        : "☀️ Light";

    localStorage.setItem(
        "portfolio-theme",
        isLight ? "light" : "dark"
    );

});


// ====================================
// TYPING ANIMATION
// ====================================

const words = [
    "AI & CS Student",
    "Future AI Engineer",
    "Programmer",
    "Technology Enthusiast"
];

const typingElement = document.getElementById("typing");

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentWord = words[wordIndex];

    if (!deleting) {

        typingElement.textContent =
            currentWord.substring(0, charIndex + 1);

        charIndex++;

        if (charIndex === currentWord.length) {
            deleting = true;
            setTimeout(typeEffect, 1200);
            return;
        }

    } else {

        typingElement.textContent =
            currentWord.substring(0, charIndex - 1);

        charIndex--;

        if (charIndex === 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }

    }

    setTimeout(typeEffect, deleting ? 45 : 90);

}

typeEffect();


// ====================================
// MOBILE NAVIGATION
// ====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("open");

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});

document.querySelectorAll("#navLinks a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ====================================
// SCROLL REVEAL ANIMATION
// ====================================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);

document.querySelectorAll(".reveal").forEach(element => {
    observer.observe(element);
});


// ====================================
// CINEMATIC SCROLL PHOTO EFFECT
// ====================================

const photo = document.getElementById("backgroundPhoto");

let ticking = false;

function updatePhotoPosition() {

    const scrollTop = window.scrollY;

    const maxScroll =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress = maxScroll > 0
        ? Math.min(Math.max(scrollTop / maxScroll, 0), 1)
        : 0;

    /*
       At top:
       Face visible.

       As visitor scrolls:
       Image framing moves toward lower body.

       At bottom:
       Lower portion becomes visible.
    */

    const startPosition = 8;
    const endPosition = 100;

    // Smoothstep easing
    const smoothProgress =
        progress * progress * (3 - 2 * progress);

    const photoPosition =
        startPosition +
        (endPosition - startPosition) * smoothProgress;

    photo.style.setProperty(
        "--photo-y",
        `${photoPosition}%`
    );

    ticking = false;

}

function requestPhotoUpdate() {

    if (!ticking) {

        window.requestAnimationFrame(updatePhotoPosition);

        ticking = true;

    }

}

window.addEventListener(
    "scroll",
    requestPhotoUpdate,
    { passive: true }
);

window.addEventListener(
    "resize",
    requestPhotoUpdate
);

updatePhotoPosition();


// ====================================
// CURRENT YEAR
// ====================================

document.getElementById("year").textContent =
    new Date().getFullYear();
