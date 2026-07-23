// =====================
// Custom Cursor
// =====================

const cursor = document.querySelector(".cursor");

// =====================
// Profile Photo Popup
// =====================

const profileTrigger = document.querySelector(".profile-trigger");
const logoTrigger = document.querySelector(".logo-trigger");
const profileModal = document.getElementById("profileModal");
const profileModalClose = document.querySelector(".image-modal-close");
const modalImage = document.getElementById("modalImage");

function openImageModal(source, alt) {
    if (!profileModal || !modalImage) return;
    modalImage.src = source;
    modalImage.alt = alt;
    profileModal.classList.add("open");
    profileModal.setAttribute("aria-hidden", "false");
    profileModalClose?.focus();
}

function closeProfileModal() {
    if (!profileModal) return;
    profileModal.classList.remove("open");
    profileModal.setAttribute("aria-hidden", "true");
}

if (profileTrigger && profileModal) {
    const openProfileModal = () => openImageModal("profile.png", "Adarsh Karanth");

    profileTrigger.addEventListener("click", openProfileModal);

    profileModal.addEventListener("click", (event) => {
        if (event.target === profileModal) closeProfileModal();
    });

    profileModalClose?.addEventListener("click", closeProfileModal);
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") closeProfileModal();
    });
}

if (logoTrigger) {
    const openLogoModal = () => {
        const logoSelector = document.body.classList.contains("light-theme") ? ".light-logo" : ".dark-logo";
        const logoImage = logoTrigger.querySelector(logoSelector);
        if (logoImage) openImageModal(logoImage.src, logoImage.alt);
    };

    logoTrigger.addEventListener("click", openLogoModal);
}

// Discourage casual copying of portfolio media. Media displayed in a browser
// cannot be made completely impossible to save or screen-record.
document.querySelectorAll("img, video").forEach((media) => {
    media.setAttribute("draggable", "false");
    media.addEventListener("contextmenu", (event) => event.preventDefault());
    media.addEventListener("dragstart", (event) => event.preventDefault());
});

// =====================
// Colour Theme
// =====================

const themeToggle = document.querySelector(".theme-toggle");
const savedTheme = localStorage.getItem("theme");
const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;

function setTheme(theme) {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);

    if (themeToggle) {
        themeToggle.setAttribute("aria-pressed", String(isLight));
        themeToggle.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
        themeToggle.innerHTML = `<i class="fa-solid fa-${isLight ? "sun" : "moon"}" aria-hidden="true"></i>`;
    }
}

setTheme(savedTheme || (prefersLight ? "light" : "dark"));

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
        setTheme(nextTheme);
        localStorage.setItem("theme", nextTheme);
    });
}

// =====================
// Mobile Navigation
// =====================

const menuToggle = document.querySelector(".menu-toggle");
const primaryMenu = document.getElementById("primary-menu");

if (menuToggle && primaryMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = primaryMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
        menuToggle.innerHTML = `<i class="fa-solid fa-${isOpen ? "xmark" : "bars"}" aria-hidden="true"></i>`;
    });

    primaryMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            primaryMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.setAttribute("aria-label", "Open navigation menu");
            menuToggle.innerHTML = '<i class="fa-solid fa-bars" aria-hidden="true"></i>';
        });
    });
}

document.addEventListener("mousemove", (e) => {
    if (cursor) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
    }
});

// =====================
// Counter Animation
// =====================

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            const counter = entry.target;
            const target = Number(counter.dataset.target);

            let count = 0;
            const speed = target / 100;

            function update() {
                count += speed;

                if (count < target) {
                    counter.innerText = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    counter.innerText = target + "+";
                }
            }

            update();
            observer.unobserve(counter);
        }
    });
});

counters.forEach(counter => observer.observe(counter));

// =====================
// Intro Animation
// =====================

const intro = document.getElementById("intro");
const website = document.getElementById("website");
const flash = document.getElementById("flash");
const whoosh = document.getElementById("whoosh");

let lastWhooshTime = 0;

function playWhoosh() {
    if (!whoosh) return;

    const now = Date.now();
    if (now - lastWhooshTime < 450) return;

    lastWhooshTime = now;
    whoosh.currentTime = 0;
    whoosh.play().catch(() => {});
}

// Only play the sound when a click takes the visitor to another page or website.
document.querySelectorAll('a[href]').forEach((link) => {
    const destination = link.getAttribute('href');
    if (destination && !destination.startsWith('#')) {
        link.addEventListener('click', playWhoosh);
    }
});

// Flash
setTimeout(() => {
    if (flash) {
        flash.classList.add("flash");
    }
}, 3600);

// Hide Intro
setTimeout(() => {
    if (intro) {
        intro.style.opacity = "0";

        setTimeout(() => {
            intro.style.display = "none";
        }, 1200);
    }

    if (website) {
        website.style.opacity = "1";
    }
}, 4000);

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }
});

backToTop.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
