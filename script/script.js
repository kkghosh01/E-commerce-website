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
  categoryHTML += `<div class="product-card">
          <img src="${category.image}" alt="Product 1" />
          <h3>${category.name}</h3>
          <p>${category.price}</p>
          <button class="btn" data-product-id="${category.id}">Add to Cart</button>
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

categoryContainer.innerHTML = categoryHTML;
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
