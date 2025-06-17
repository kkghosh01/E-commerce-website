import observeOnScroll from "./scrollObserver.js";
import handleCartCount from "./controllers/cartController.js";
import { products } from "./products.js";
import { categoryProducts } from "./products.js";
import { handleNavbar } from "./controllers/navbarController.js";
import { updateCartCount } from "./utility/utility.js";
const newArrivalContainer = document.querySelector(".new-arrival-grid");
const topRatedContainer = document.querySelector(".top-rated-grid");
const categoryContainer = document.querySelector(".product-grid");

// Initialize the navbar functionality
// and handle the scroll behavior
handleNavbar();

// Generate HTML for categories, new arrivals, and top-rated products
let categoryHTML = "";
categoryProducts.forEach((category) => {
  // Get image path without extension (assuming both .webp and .jpg exist with same name)
  const baseImagePath = category.image.replace(/\.(jpg|jpeg|png|webp)$/i, "");

  categoryHTML += `
    <div class="swiper-slide">
      <div class="product-card">
        <picture>
          <source srcset="${baseImagePath}.webp" type="image/webp" />
          <img src="${baseImagePath}.jpg" loading="eager" fetchpriority="high" alt="${category.name}" />
        </picture>
        <h3>${category.name}</h3>
      </div>
    </div>`;
});

document.getElementById("category-slider").innerHTML = categoryHTML;

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
            ${product.discount || ""}% OFF
          </span>
          <h3>${product.name.newArrival}</h3>
          <p>${product.price}</p>
          <button class="btn" data-product-id="${
            product.id
          }">Add to Cart</button>
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
          <button class="btn" data-product-id="${product.id}">Add to Cart</button>
        </div>`;
});

newArrivalContainer.innerHTML = newArrivalHTML;
topRatedContainer.innerHTML = topRatedHTML;

// Observe elements on scroll to add animations
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

// Handle cart count updates
handleCartCount();

updateCartCount();

const swiper = new Swiper(".mySwiper", {
  slidesPerView: 2,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  breakpoints: {
    320: { slidesPerView: 2.5 },
    480: { slidesPerView: 3 },
    600: { slidesPerView: 3.5 },
    700: { slidesPerView: 4 },
    900: { slidesPerView: 4.5 },
    1000: { slidesPerView: 5 },
    1100: { slidesPerView: 5.5 },
    1250: { slidesPerView: 6 },
    1400: { slidesPerView: 7 },
    1600: { slidesPerView: 8 },
  },
});

new Swiper("#swiper-image", {
  slidesPerView: 1,
  spaceBetween: 10,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});
