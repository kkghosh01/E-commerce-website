// utility.js

import { getCart, setCart } from "../cart.js";

// ✅ Update cart item count in header
export function updateCartCount() {
  const cart = getCart();
  const cartCount = document.querySelector(".cart-items");

  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  if (cartCount) {
    cartCount.textContent = itemCount;
    cartCount.classList.remove("hiden");
  }
}

// ✅ Update order summary (right sidebar + mobile + cart subtotal)
export function updateOrderSummary() {
  const cart = getCart();
  const cartSectionRight = document.querySelector(".right-section");
  const cartTotal = document.querySelector(".cart-total");
  const mobileCartTotal = document.querySelector(".total-mobile .total");
  const soppingBagItems = document.querySelector(".cart-items-count");

  // Total without discount
  const total = cart.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  // Discount total
  const discount = cart.reduce(
    (sum, item) =>
      sum + ((item.price * (item.discount || 0)) / 100) * (item.quantity || 1),
    0
  );

  // Final amount
  const estimatedTotal = total - discount;

  // Item count
  const itemCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // Subtotal for desktop
  const subtotalHTML = `
    <h3>Subtotal <span class="cart-items">(${itemCount} items)</span>: $${total.toFixed(
    2
  )}</h3>
  `;

  // ✅ Full order summary (desktop)
  if (cartSectionRight) {
    cartSectionRight.innerHTML = `
      <h2>Order Summary</h2>
      <div class="summary-container">
        <div class="summary-item">
          <p class="title">Items total</p>
          <p class="value">$${total.toFixed(2)}</p>
        </div>
        <div class="summary-item">
          <p class="title">Items discount</p>
          <p class="discount">- $${discount.toFixed(2)}</p>
        </div>
        <div class="summary-item">
          <p>Subtotal</p>
          <p>$${total.toFixed(2)}</p>
        </div>
        <div class="summary-item">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div class="summary-item">
          <p class="total">Estimated total</p>
          <p class="total">$${estimatedTotal.toFixed(2)}</p>
        </div>
        <button class="checkout-btn">Checkout</button>
      </div>
    `;
  }

  // ✅ Desktop subtotal (above item list)
  if (cartTotal) {
    cartTotal.innerHTML = subtotalHTML;
  }

  // ✅ Mobile view estimated total only
  if (mobileCartTotal) {
    mobileCartTotal.innerHTML = `
      <h3>Estimated Total (${itemCount} items): $${estimatedTotal.toFixed(
      2
    )}</h3>
      <small class="discount-note">You saved $${discount.toFixed(2)}</small>
    `;
  }

  // ✅ Shopping bag text
  if (soppingBagItems) {
    soppingBagItems.textContent = `(${itemCount}) items in your bag`;
  }
}

// ✅ Generate HTML for cart items
export function generateCartItemsHTML() {
  const cart = getCart();
  const cartSection = document.querySelector(".cart-section");
  const cartSectionLeft = document.querySelector(".left-section");
  const cartSectionRight = document.querySelector(".right-section");

  if (cart.length === 0) {
    if (cartSectionLeft) cartSectionLeft.classList.add("empty");
    if (cartSectionRight) cartSectionRight.classList.add("empty");

    if (cartSection) {
      cartSection.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>Your cart is empty</h3>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <a href="index.html" class="btn">Continue Shopping</a>
        </div>
      `;
    }
    return "";
  }

  return cart
    .map(
      (item) => `
        <div class="cart-item">
          <img class="item" src="${item.image}" alt="${item.name.newArrival}" />
          <div class="product-details item">
            <div class="item-details">
              <div class="item-header">
                <h3>${item.name.newArrival}</h3>
                <p class="item-description">This is a brief description of Product Name 1.</p>
                <p class="mobile-only">${item.price}</p>
              </div>
              <div class="item-info">
                <p>Category: Men</p>
                <p>Size: M</p>
                <p>Color: Blue</p>
              </div>
            </div>
          </div>
          <div class="quantity item">
            <button class="decrease"><i class="fa-solid fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button class="increase"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="price item"><p>${item.price}</p></div>
          <div class="action item">
            <button class="remove-btn">Remove</button>
          </div>
        </div>`
    )
    .join("");
}

// ✅ Quantity button handlers
export function updateQuantityButtons() {
  const cart = getCart();
  const productContainer = document.querySelector(".product-container");

  if (!productContainer) return;

  const items = productContainer.querySelectorAll(".cart-item");

  items.forEach((item, index) => {
    const decreaseButton = item.querySelector(".decrease");
    const increaseButton = item.querySelector(".increase");
    const quantitySpan = item.querySelector("span");

    if (!decreaseButton || !increaseButton || !quantitySpan) return;

    decreaseButton.disabled = cart[index].quantity <= 1;
    quantitySpan.textContent = cart[index].quantity || 1;

    increaseButton.addEventListener("click", () => {
      cart[index].quantity += 1;
      setCart(cart);
      reRenderCartUI();
    });

    decreaseButton.addEventListener("click", () => {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
        setCart(cart);
        reRenderCartUI();
      }
    });
  });
  console.log(cart);
}

// ✅ Remove item button handlers
export function setupRemoveButtons() {
  const cart = getCart();
  const productContainer = document.querySelector(".product-container");

  if (!productContainer) return;

  const removeButtons = productContainer.querySelectorAll(".remove-btn");

  removeButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      cart.splice(index, 1);
      setCart(cart);
      reRenderCartUI();
    });
  });
}

// ✅ Re-render cart UI completely
function reRenderCartUI() {
  const productContainer = document.querySelector(".product-container");
  if (!productContainer) return;

  productContainer.innerHTML = generateCartItemsHTML();
  updateCartCount();
  updateOrderSummary();
  updateQuantityButtons();
  setupRemoveButtons();
}
