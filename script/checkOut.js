import { handleNavbar } from "./controllers/navbarController.js";
import observeOnScroll from "./scrollObserver.js";
import { cart } from "./cart.js";
import { updateCartCount } from "./utility/utility.js";

const productContainer = document.querySelector(".product-container");

handleNavbar();

// Function to generate cart items HTML
function generateCartItemsHTML() {
  return cart
    .map(
      (item) => `
     <div class="cart-item">
            <img
              src="${item.image}"
              alt="Product 1"
            />
            <div class="product-details">
              <div class="item-details">
                <div class="item-header">
                  <h3>${item.name.newArrival}</h3>
                  <p class="item-description">
                    This is a brief description of Product Name 1.
                  </p>
                </div>
                <div class="item-info">
                  <p>Category: Men</p>
                  <p>Size: M</p>
                  <p>Color: Blue</p>
                </div>
                <button class="remove-btn">Remove</button>
              </div>
            </div>
            <div class="quantity">
              <button class="decrease" disabled>
                <i class="fa-solid fa-minus"></i>
              </button>
              <span>${item.quantity}</span>
              <button class="increase"><i class="fa-solid fa-plus"></i></button>
            </div>
            <div class="price">
              <p>${item.price}</p>
            </div>
          </div>`
    )
    .join("");
}

productContainer.innerHTML = generateCartItemsHTML();
updateCartCount();

observeOnScroll({
  selectors: [
    ".cart-container",
    ".slide-in",
    ".footer-card",
    ".tag-lines",
    ".right-section",
  ],
  threshold: 0.1,
  stagger: true,
  rootMargin: "0px",
});
