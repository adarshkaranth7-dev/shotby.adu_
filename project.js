const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const videos = document.querySelectorAll("video");

let current = 0;

function updateSlider() {
    track.style.transform = `translateX(-${current * 100}%)`;

    // Pause all videos when changing slide
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

document.querySelector(".next").addEventListener("click", () => {
    current = (current + 1) % slides.length;
    updateSlider();
});

document.querySelector(".prev").addEventListener("click", () => {
    current = (current - 1 + slides.length) % slides.length;
    updateSlider();
});

// Only one video plays at a time
videos.forEach(video => {
    video.addEventListener("play", () => {
        videos.forEach(other => {
            if (other !== video) {
                other.pause();
                other.currentTime = 0;
            }
        });
    });
});