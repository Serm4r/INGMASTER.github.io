const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
let slideIndex = 0;

function showSlide(index) {
    if (index >= slider.children.length) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = slider.children.length - 1;
    } else {
        slideIndex = index;
    }
    slider.style.transform = `translateX(${-slideIndex * 100}%)`;
}

function nextSlide() {
    showSlide(slideIndex + 1);
}

function prevSlide() {
    showSlide(slideIndex - 1);
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);
