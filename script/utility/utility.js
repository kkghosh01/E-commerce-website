export function updateCartCount() {
  const cartCount = document.querySelector(".cart-items");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (cartCount) {
    cartCount.textContent = total;
    cartCount.classList.remove("hiden");
  }
}
