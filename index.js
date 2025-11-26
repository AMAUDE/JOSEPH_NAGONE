let slideIndex = 1;
let autoSlideInterval;

document.addEventListener('DOMContentLoaded', function () {
  showSlides(slideIndex);
  startAutoSlide();

  // Masquer le loader
  document.getElementById("loader").style.display = "none";
});

function plusSlides(n) {
  resetAutoSlide();
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  resetAutoSlide();
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let slides = document.getElementsByClassName("carousel-slide");
  let dots = document.getElementsByClassName("indicator");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  Array.from(slides).forEach(slide => slide.classList.remove("active"));
  Array.from(dots).forEach(dot => dot.classList.remove("active"));

  slides[slideIndex - 1].classList.add("active");
  dots[slideIndex - 1].classList.add("active");
}

function startAutoSlide() {
  autoSlideInterval = setInterval(() => plusSlides(1), 5000);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}
