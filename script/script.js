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

// .hero, .hero-overlay, .product-card, .new-arrival-card, .top-rated-card, .product-banner
