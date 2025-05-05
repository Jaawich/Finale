const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");
const totalDisplay = document.getElementById("cart-total");

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cartItems.length.toString();
  }
}

function renderCart() {
  container.innerHTML = "";
  let total = 0;

  if (cartItems.length === 0) {
    container.innerHTML = "<p style='text-align:center;'>Your cart is empty 🛒</p>";
    totalDisplay.textContent = "0.00";
    return;
  }

  cartItems.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "product-card";
div.innerHTML = `
  <img src="${item.image}" alt="${item.name}">
  <div class="product-info">
    <h2>${item.name}</h2>
    <p class="price">$${parseFloat(item.price).toFixed(2)}</p>
    <p class="quantity">Qty: 1</p>
    <p class="stock">✅ In Stock</p>
    <button onclick="removeItem(${index})" class="remove-icon-btn">🗑</button>
  </div>
`;



    container.appendChild(div);
    total += parseFloat(item.price);
  });

  totalDisplay.textContent = total.toFixed(2);
}

function removeItem(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
  updateCartCount();
}

document.getElementById("clear-cart").addEventListener("click", () => {
  if (confirm("Are you sure you want to empty your cart?")) {
    localStorage.removeItem("cart");
    location.reload();
  }
});

// Initial Render
renderCart();

updateCartCount();
