import { handleNavbar } from "./controllers/navbarController.js";
import observeOnScroll from "./scrollObserver.js";
import {
  generateCartItemsHTML,
  updateCartCount,
  updateOrderSummary,
  updateQuantityButtons,
  setupRemoveButtons,
} from "./utility/utility.js";

const productContainer = document.querySelector(".product-container");

handleNavbar();

// Initial UI render
productContainer.innerHTML = generateCartItemsHTML();
updateCartCount();
updateOrderSummary();
updateQuantityButtons();
setupRemoveButtons();

observeOnScroll({
  selectors: [
    ".cart-container",
    ".slide-in",
    ".footer-card",
    ".tag-lines",
    ".right-section",
    ".total-mobile",
  ],
  threshold: 0.1,
  stagger: true,
  rootMargin: "0px",
});
