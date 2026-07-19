// =====================
// Custom Cursor
// =====================

const cursor = document.querySelector(".cursor");

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


// Play Whoosh Sound
setTimeout(() => {

    if (whoosh) {
        whoosh.play().catch(() => {});
    }

}, 700);


// Flash Effect
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
