let index = 0;
const track = document.querySelector('.hero-track');
const slides = document.querySelectorAll('.Heros');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const dotsContainer = document.querySelector('.hero-dots');

let autoSlide;
let startX = 0;
let endX = 0;

slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.addEventListener('click', () => showSlide(i));
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.hero-dots span');

function updateDots() {
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
}

function showSlide(i) {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
}

nextBtn.addEventListener('click', () => showSlide(index + 1));
prevBtn.addEventListener('click', () => showSlide(index - 1));

function startAutoSlide() {
    autoSlide = setInterval(() => showSlide(index + 1), 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlide);
}

startAutoSlide();
updateDots();

track.addEventListener('mouseenter', stopAutoSlide);
track.addEventListener('mouseleave', startAutoSlide);

track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
    endX = e.changedTouches[0].clientX;
    if (startX - endX > 50) showSlide(index + 1);
    if (endX - startX > 50) showSlide(index - 1);
})

const points = document.querySelectorAll(".gallery .point.reveal");

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 } 
);

points.forEach(point => observer.observe(point));
