import { products } from "../products.js";
import { cart } from "../cart.js";

export default function handleCartCount() {
  const addToCartBtn = document.querySelectorAll(".btn");
  const cartCount = document.querySelector(".cart-items");

  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      const id = parseInt(btn.dataset.productId);
      const cartProduct = products.find((product) => product.id === id);
      if (!cartProduct) return;

      // Check if the product is already in cart
      const existingItem = cart.find((item) => item.id === id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        // Clone the product object and add quantity property
        cart.push({ ...cartProduct, quantity: 1 });
      }

      // Update cart count display
      const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCount.textContent = totalItems;
      cartCount.classList.remove("hiden");

      localStorage.setItem("cart", JSON.stringify(cart));
    });
  });
}
