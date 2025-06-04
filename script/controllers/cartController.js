export default function handleCartCount() {
  const addToCartBtn = document.querySelectorAll(".btn");
  const cartCount = document.querySelector(".cart-items");
  addToCartBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const cartItems = parseInt(cartCount.textContent) || 0;
      cartCount.textContent = cartItems + 1;

      cartCount.classList.remove("hiden");
    });
  });
}
