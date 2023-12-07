const items = document.querySelectorAll(".grid-item");

items.forEach((item, index) => {
  item.dataset.index = index;

  item.addEventListener("mouseenter", () => {
    if (!item.querySelector(".add-to-cart-btn")) {
      addButton(item, addToCartBtn());
    }
  });

  item.addEventListener("mouseleave", () => {
    let button = item.querySelector(".add-to-cart-btn");
    if (button) {
      button.remove();
    }
  });
});

function addButton(item, htmlEl) {
  const img = item.querySelector("img");
  img.insertAdjacentHTML("afterend", htmlEl);

  const button = item.querySelector(".add-to-cart-btn");
  button.addEventListener("click", () => {
    toggleCartState(item);
  });
}

function addToCartBtn() {
  return '<button class="add-to-cart-btn">Add To Cart</button>';
}

function toggleCartState(item) {
  const index = item.dataset.index;
  const cartItems = getCartItems();
  const itemIndex = cartItems.indexOf(index);

  if (itemIndex > -1) {
    cartItems.splice(itemIndex, 1); // Remove item from cart
  } else {
    cartItems.push(index); // Add item to cart
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateItemStyles();
}

function getCartItems() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function updateItemStyles() {
  const cartItems = getCartItems();
  items.forEach((item) => {
    const index = item.dataset.index;
    if (cartItems.includes(index)) {
      item.classList.add("added-to-cart");
    } else {
      item.classList.remove("added-to-cart");
    }
  });
}

// Initial load check
updateItemStyles();
