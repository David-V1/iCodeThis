class WishList {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    this.items = this.items.filter((i) => i.id !== item);
    const listWrapper = document.querySelector(".list-wrapper");
    listWrapper.innerHTML = "";
    this.displayItems();
    this.noItemsMessage();
  }

  getItems() {
    return this.items;
  }

  noItemsMessage() {
    if (this.getItems().length === 0) {
      const shareListBtn = document.querySelector(".header button");
      shareListBtn.textContent = "Empty Wishlist";
      shareListBtn.disabled = true;
      shareListBtn.style.backgroundColor = "#ccc";
      shareListBtn.style.cursor = "not-allowed";

      const listWrapper = document.querySelector(".list-wrapper");
      listWrapper.innerHTML = "";
      const noItemsMessage = document.createElement("div");
      noItemsMessage.classList.add("no-items-message");
      noItemsMessage.innerHTML = `
        <h2 class="text-2xl">No items in your wish list</h2>
        <p class="text-gray-400">Click the heart icon on an item to add it to your wish list.</p>
      `;
      listWrapper.appendChild(noItemsMessage);
    }
  }

  displayItem(item) {
    const cardItem = document.createElement("div");
    cardItem.classList.add("card-item", "p-8", "shadow-2xl", "my-8");

    const cardX = document.createElement("div");
    cardX.classList.add("card__x");
    cardX.style.textAlign = "right";

    const closeButton = document.createElement("button");
    closeButton.classList.add("text-gray-400", "hover:text-gray-900");
    closeButton.innerHTML = `
      <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    `;
    cardX.appendChild(closeButton);
    cardItem.appendChild(cardX);
    closeButton.addEventListener("click", () => {
      console.log("X button clicked item.id: ", item.id);
      this.removeItem(item.id);
    });

    const cardFlexContainer = document.createElement("div");
    cardFlexContainer.classList.add("card__flex-container", "flex", "gap-5");

    const itemImg = document.createElement("div");
    itemImg.classList.add("card__img");
    const imgTag = document.createElement("img");
    imgTag.src = item.image;
    imgTag.width = "125";
    imgTag.alt = item.name;
    itemImg.appendChild(imgTag);

    // Create the content container
    const itemContent = document.createElement("div");
    itemContent.classList.add("card__content");
    const h2 = document.createElement("h2");
    h2.textContent = item.name;
    const p = document.createElement("p");
    p.textContent = item.description;
    itemContent.appendChild(h2);
    itemContent.appendChild(p);

    // Create the price container
    const itemPrice = document.createElement("div");
    itemPrice.classList.add("card__price");
    itemPrice.innerHTML = `
      <p>
        <span class="material-symbols-outlined dollar-icon">attach_money</span>${item.price.toFixed(
          2
        )}
      </p>
      <button class="cart-btn shadow-lg">
        <span class="material-symbols-outlined cart-icon">add_shopping_cart</span>Add to Cart
      </button>
    `;

    cardFlexContainer.appendChild(itemImg);
    cardFlexContainer.appendChild(itemContent);
    cardFlexContainer.appendChild(itemPrice);

    cardItem.appendChild(cardFlexContainer);

    const listWrapper = document.querySelector(".list-wrapper");
    listWrapper.appendChild(cardItem);
  }

  displayItems() {
    const items = this.getItems();
    items.forEach((item) => {
      this.displayItem(item);
    });
  }

  wishlistDate() {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const wishlistDate = date.toLocaleDateString("en-US", options);
    return wishlistDate;
  }

  displayWishlistDate() {
    const wishlistDate = this.wishlistDate();
    const wishlistDateContainer = document.querySelector(".header__info small");
    wishlistDateContainer.textContent = wishlistDate;
  }
}

const item1 = {
  id: 1,
  name: "Paddywax Relish Artisan Hand-Poured Scented Candle, 9.5-Ounce, Ocean Tide + Sea Salt",
  price: 19.78,
  description:
    "The Paddywax Library Collection pairs exquisite fragrance with a literary great. Kate Chopin was an American author of short stories and novels, mostly of a Louisiana Creole background. Today she is considered a forerunner of the feminist authors of the 20th century. This candle is a blend of ocean tide and sea salt.",
  image:
    "https://m.media-amazon.com/images/I/71UL7D3xCZL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
};
const item2 = {
  id: 2,
  name: "IRON °FLASK Sports Water Bottle - 24 Oz - 3 Lids (Narrow Spout Lid) Leak Proof Vacuum Insulated Stainless Steel - Hot & Cold Double Walled Insulated Thermos, Durable Metal Canteen",
  price: 21.95,
  description:
    "Special introductory price! SPORTS WATER BOTTLE INSULATED: Goodbye sweat! The double wall insulation makes the Iron Flask sweat-free! It keeps your drink COLD for up to 24 hours, and HOT for up to 12 hours. *NOTE: ONLY the 14 Oz, 18 Oz, & 22 Oz fit in cupholders*",
  image: "https://m.media-amazon.com/images/I/71VvlZSwWML._AC_SX679_.jpg",
};

const item3 = {
  id: 3,
  name: "Royal Norfolk Turquoise Swirl Stoneware Bowls - 5 1/2, Set of 4",
  price: 24.99,
  description:
    "Deep turquoise stoneware bowls with a calming swirl pattern and brown accents on the trim are an easy way to brighten up the dinner table.",
  image: "https://m.media-amazon.com/images/I/41cNHZRdbLL._AC_.jpg",
};
const wishList = new WishList();
wishList.addItem(item1);
wishList.addItem(item2);
wishList.addItem(item3);
wishList.displayItems();
wishList.noItemsMessage();
wishList.displayWishlistDate();
