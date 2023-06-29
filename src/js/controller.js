"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";

const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const links = document.querySelectorAll(".link");
const sections = document.querySelectorAll("section");
const btnMobile = document.querySelector(".nav__mobile");
const navBackground = document.querySelector(".nav__mobile-background");
const btnSend = document.querySelector(".news__form");
const mobileLinks = document.querySelector(".nav__mobile-links");

const navMobile = function () {
  mobileLinks.classList.toggle("clicked");
  navBackground.classList.toggle("background");
  setTimeout(() => {
    document.querySelector(".nav__mobile-box").classList.toggle("active");
  }, 250);
};

btnMobile.addEventListener("click", navMobile);
links.forEach((e) => {
  e.addEventListener("click", function () {
    if (window.matchMedia("(max-width: 950px)").matches) {
      navMobile();
    }
  });
});

btnSend.addEventListener("submit", function (e) {
  e.preventDefault();
  document.querySelector(".section-4").textContent = "Thank you very much for subscribing to our group";
  
});

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.contains("section-4") &&
    entry.target.classList.remove("hidden4");
  entry.target.classList.remove("hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.30,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.contains("section-4") && section.classList.add("hidden4");
  section.classList.add("hidden");
});

const slider = function () {
  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot-active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot-active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  //Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
