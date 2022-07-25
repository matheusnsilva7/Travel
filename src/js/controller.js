import "core-js/stable";
import "regenerator-runtime/runtime";

const btnLearn = document.querySelector(".header__title-btn");
const navLinks = document.querySelector(".nav__links");
const nav = document.querySelector(".nav");
const header = document.querySelector("header");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
const links = document.querySelectorAll(".link");
const btnNews = document.querySelectorAll(".btn-news");
const sections = document.querySelectorAll("section");
const btnMobile = document.querySelector(".nav__mobile")
const navBackground = document.querySelector(".nav__mobile-background");
const news = document.querySelector(".news");
const exitNews= document.querySelector(".exit");
const btnSend = document.querySelector(".form-btn");
const mobileLinks = document.querySelector(".nav__mobile-links");

btnLearn.addEventListener("click",function(){
    const section1 = document.querySelector(".section-1");
    section1.scrollIntoView({ behavior: "smooth" });
});


navLinks.addEventListener("click", function(e){
    e.preventDefault();
    if(e.target.classList.contains("link")){
        const id = e.target.getAttribute("href");
        document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    };
});
const navMobile= function(){
  mobileLinks.classList.toggle("clicked");
  navBackground.classList.toggle("background")
  setTimeout(()=>{
    document.querySelector(".nav__mobile-box").classList.toggle("active")
  },250);
}

btnMobile.addEventListener("click",navMobile);
links.forEach(e => {
  e.addEventListener("click",function(){
    if(window.matchMedia("(max-width: 950px)").matches){
      navMobile() 
    }
  })
});

btnNews.forEach(e=> {
  e.addEventListener("click",function(e){
    e.preventDefault()
    news.classList.add("active");
    if(mobileLinks.classList.contains('clicked'))navMobile();
  })
});
news.addEventListener("click",function(e){
  if(e.target.classList.contains("news"))news.classList.remove("active")
});
exitNews.addEventListener("click",function(){
  news.classList.remove("active")
});

btnSend.addEventListener("click",function(e){
    e.preventDefault();
    document.querySelector('.working').classList.add('active')
    setTimeout(function(){
      document.querySelector('.working').classList.remove('active')
      news.classList.remove("active")
    },1500)
});

const houver = function(e){
    if(e.target.classList.contains("nav__link")){
        const link = document.querySelectorAll(".nav__link");
        const logo = document.querySelector(".nav__logo");

        link.forEach(el => {
            if(el !== e.target) el.style.opacity = this;
        })
        logo.style.opacity = this;
    };
};

nav.addEventListener("mouseover", houver.bind(0.5));
nav.addEventListener("mouseout", houver.bind(1));

const stickyNav = function (entries) {
    const [entry] = entries;

    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  };
  
const headerObserver = new IntersectionObserver(stickyNav, {
    root: null,
    threshold: 0.15,
  });
  
headerObserver.observe(header);

const revealSection = function (entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
  
    entry.target.classList.remove("hidden");
    observer.unobserve(entry.target);
  };
  
  const sectionObserver = new IntersectionObserver(revealSection, {
    root: null,
    threshold: 0.15,
  });
  
  sections.forEach(function (section) {
    sectionObserver.observe(section);
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
        .forEach(dot => dot.classList.remove("dots__dot-active"));
  
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
  
    // Event handlers
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

