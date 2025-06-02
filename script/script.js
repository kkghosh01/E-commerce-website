import observeOnScroll from "./scrollObserver.js";

let prevScrollPos = window.pageYOffset;
const header = document.getElementById("main-header");
let isScrolling;

window.addEventListener("scroll", function () {
  let currentScrollPos = window.pageYOffset;

  if (prevScrollPos > currentScrollPos) {
    header.style.top = "0";
  } else {
    header.style.top = "-100px";
  }

  prevScrollPos = currentScrollPos;

  window.clearTimeout(isScrolling);

  isScrolling = setTimeout(function () {
    header.style.top = "0";
  }, 150);
});

observeOnScroll({
  selectors: [
    ".hero",
    ".hero-overlay",
    ".product-card",
    ".new-arrival-card",
    ".top-rated-card",
    ".product-banner",
    ".footer-card",
    ".tag-lines",
  ],
  threshold: 0.1,
  stagger: true,
});

const menuIcon = document.querySelector(".nav-links i");
const navMenu = document.querySelector(".nav-links ul");

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

const mobileSearchBtn = document.querySelector(".mobile-search-btn");
const mobileSearchInput = document.querySelector(".mobile-search-input");

mobileSearchBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  mobileSearchInput.classList.toggle("active");
});

// Optional: Close on outside click
document.addEventListener("click", (e) => {
  if (
    !mobileSearchInput.contains(e.target) &&
    !mobileSearchBtn.contains(e.target)
  ) {
    mobileSearchInput.classList.remove("active");
  }
});
