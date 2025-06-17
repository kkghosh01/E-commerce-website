import { products } from "../products.js";
import { getCart } from "../cart.js";
const cart = getCart();

const addedToCart = document.querySelector(".added-to-cart");

export default function handleCartCount() {
  const addToCartBtn = document.querySelectorAll(".btn");
  const cartCount = document.querySelector(".cart-items");

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const id = parseInt(btn.dataset.productId);
      const cartProduct = products.find((product) => product.id === id);
      if (!cartProduct) return;

      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...cartProduct, quantity: 1 });
      }

      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.classList.remove("hiden");

      // Show animated "added to cart" message
      addedToCart.classList.add("show-intervel");

      // Remove the class after animation ends
      setTimeout(() => {
        addedToCart.classList.remove("show-intervel");
      }, 2000);

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}
