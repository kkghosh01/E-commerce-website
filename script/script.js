import observeOnScroll from "./scrollObserver.js";
import handleCartCount from "./controllers/cartController.js";
import { products } from "./products.js";
import { categoryProducts } from "./products.js";
const menuIcon = document.querySelector(".nav-links i");
const navMenu = document.querySelector(".nav-links ul");
const newArrivalContainer = document.querySelector(".new-arrival-grid");
const topRatedContainer = document.querySelector(".top-rated-grid");
const categoryContainer = document.querySelector(".product-grid");

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

menuIcon.addEventListener("click", (e) => {
  e.stopPropagation();
  navMenu.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!navMenu.contains(e.target) && !menuIcon.contains(e.target)) {
    navMenu.classList.remove("active");
  }
});

let categoryHTML = "";
categoryProducts.forEach((category) => {
  categoryHTML += `<div class="product-card">
          <img src="${category.image}" alt="Product 1" />
          <h3>${category.name}</h3>
          <p>${category.price}</p>
          <button class="btn">Add to Cart</button>
        </div>`;
});

let newArrivalHTML = "";
let topRatedHTML = "";

products.forEach((product) => {
  newArrivalHTML += `<div class="new-arrival-card">
          <div class="favourite-icon">
            <button class="favourite-btn">❤️</button>
          </div>
          <img
            src="${product.image}"
            alt="${product.name.newArrival}"
          />
          <span class="discount ${!product.discount ? "hidden" : ""}">
            ${product.discount || ""}
          </span>
          <h3>${product.name.newArrival}</h3>
          <p>${product.price}</p>
          <button class="btn">Add to Cart</button>
        </div>`;
  topRatedHTML += ` <div class="top-rated-card">
          <img
            src="${product.image}"
            alt="${product.name.topRated}"
          />
          <h3>${product.name.topRated}</h3>
          <div class="star-rating">
            <span>★ ★ ★ ★ ☆</span>
          </div>
          <p>${product.price}</p>
          <button class="btn">Add to Cart</button>
        </div>`;
});

categoryContainer.innerHTML = categoryHTML;
newArrivalContainer.innerHTML = newArrivalHTML;
topRatedContainer.innerHTML = topRatedHTML;

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

handleCartCount();
