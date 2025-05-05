// Toggle login modal
function openAuth() {
  document.getElementById("loginModal").style.display = "flex";
}

function closeLogin() {
  const loginModal = document.getElementById("loginModal");
  if (loginModal) {
    loginModal.style.display = "none";
  }
}


// Handle login click (check if user is logged in)
function handleLoginClick() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (isLoggedIn) {
    window.location.href = "../html/settings.html";
  } else {
    openAuth();
  }
}
// Handle login form submission
function submitLogin() {
  alert("Login successful!");
  localStorage.setItem("isLoggedIn", "true");
  closeLogin();
}

// Handle logout (in settings page)
function logout() {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "../html/index.html"; // Redirect to homepage
}

// Update cart count in navbar
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCount = document.getElementById('cart-count');
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Toggle search input visibility
function toggleSearch() {
  const input = document.querySelector(".search-input");
  input.classList.toggle("active");
}

// Initialize event listeners after page loads
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();

  const searchInput = document.querySelector(".search-input");
  const productCards = document.querySelectorAll(".product-card");

  if (searchInput && productCards.length > 0) {
    searchInput.addEventListener("input", function () {
      const query = this.value.toLowerCase();

      productCards.forEach(card => {
        const name = card.querySelector("h2").textContent.toLowerCase();
        if (name.includes(query)) {
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  }
});


  // Add to cart buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach(btn => {
    if (btn.textContent.includes("Add to Cart")) {
      btn.addEventListener("click", () => {
        const card = btn.closest(".product-card");
        const name = card.querySelector("h2").textContent;
        const price = card.querySelector("p").textContent.replace("$", "");
        const image = card.querySelector("img").src;
        const item = { name, price, image };

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();
        alert(`${name} added to cart!`);
      });
    }
  });

  // Search bar animation
  const searchContainer = document.querySelector(".search-container");
  const searchInput = document.querySelector(".search-input");

  if (searchContainer && searchInput) {
    searchContainer.addEventListener("mouseenter", () => {
      searchInput.classList.add("active");
    });

    searchContainer.addEventListener("mouseleave", () => {
      searchInput.classList.remove("active");
    });
  }

  // Header scroll effect
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
});
