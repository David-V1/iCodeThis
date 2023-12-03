const productsContainer = document.querySelector(".products-container");
let prevClickedImage = null;

const treeImage =
  "https://i.etsystatic.com/23174184/r/il/0055d5/5104392128/il_1588xN.5104392128_kqwu.jpg";
const giftImage =
  "https://i.etsystatic.com/23174184/r/il/2192e1/5100443284/il_1588xN.5100443284_lyov.jpg";
const gingerbreadImage =
  "https://i.etsystatic.com/10167696/r/il/d8ede2/5561900559/il_1588xN.5561900559_ecew.jpg";

const tree = {
  id: 1,
  image: treeImage,
  name: "Christmas Tree Decoration",
  price: 19.99,
  stars: 4.5,
  description:
    "A beautiful decoration for your tree. Standing at an impressive height, this lush, full-bodied tree boasts rich green needles that emulate the charm of a fresh, forest-harvested tree without any of the upkeep. Each branch is crafted to perfection, ensuring a natural and inviting appearance. Pre-strung with dazzling lights, this tree offers a warm, festive glow, creating an enchanting centerpiece for your holiday celebrations. Easy to assemble and durable, it's designed to bring joy for seasons to come.",
};

const gift = {
  id: 2,
  image: giftImage,
  name: "Christmas Gift",
  price: 29.99,
  stars: 3.5,
  description:
    "A beautiful gift for your loved ones. Curated with a selection of premium goodies, this hamper is the epitome of festive cheer. It includes artisanal chocolates, gourmet snacks, and a bottle of fine wine, all nestled in a beautifully crafted, reusable basket. Adorned with a hand-tied red ribbon and festive embellishments, this gift hamper is not just a present, but a luxurious experience, promising to make your festive moments truly memorable.",
};

const gingerbread = {
  id: 3,
  image: gingerbreadImage,
  name: "Gingerbread",
  price: 9.99,
  stars: 5,
  description:
    "Indulge in the sweet essence of the holidays with our Traditional Festive Gingerbread Treats. Hand-baked to golden perfection, these gingerbread delights are a harmonious blend of spicy ginger, warm cinnamon, and sweet molasses. Each piece is intricately decorated with icing, showcasing festive designs that capture the spirit of Christmas. Perfectly crunchy on the outside and delightfully soft on the inside, these gingerbread treats are ideal for sharing with family and friends, or as a charming addition to your holiday spread.",
};

const featuredProducts = [tree, gift, gingerbread];

const createElement = (tag, className = [], attributes = {}) => {
  const element = document.createElement(tag);
  if (className.length > 0) {
    className.forEach((c) => element.classList.add(c));
  }
  Object.keys(attributes).forEach((key) => {
    if (key === "innerText" || key === "textContent") {
      element[key] = attributes[key];
    } else {
      element.setAttribute(key, attributes[key]);
    }
  });
  return element;
};

// **********************************************************************************************************

const createProductImages = (products, imgSize) =>
  products.map((product) => {
    const imageElement = createElement("img", [`max-w-[${imgSize}%]`], {
      src: product.image,
      alt: product.name,
    });
    imageElement.addEventListener("click", () =>
      handleImageClick(product, imageElement)
    );
    return imageElement;
  });

// Modify DOM
const appendElementsToContainer = (container, elements) => {
  container.innerHTML = "";
  elements.forEach((element) => container.appendChild(element));
};

const imageElements = createProductImages(featuredProducts, 25);
appendElementsToContainer(productsContainer, imageElements);

const handleImageClick = (product, imageElement) => {
  if (prevClickedImage) {
    prevClickedImage.classList.remove(
      "border-2",
      "border-red-500",
      "shadow-xl",
      "scale-up"
    );
  }
  imageElement.classList.add(
    "border-2",
    "border-red-500",
    "shadow-xl",
    "scale-up"
  );
  prevClickedImage = imageElement;
  renderFeaturedProduct(product);
};

// **********************************************************************************************************
const renderFeaturedProduct = (product) => {
  const featuredProductsContainer = document.querySelector(".featured-product");
  if (!featuredProductsContainer) {
    console.error("No element found with the class 'featured-product'");
    return;
  }
  featuredProductsContainer.innerHTML = "";
  const flexContainer = createElement("div", [
    "flex",
    "justify-between",
    "gap-[2rem]",
  ]);
  // ********************
  const imgContainer = createElement("div", [
    "img-container",
    "flex",
    "justify-center",
  ]);
  const imgElement = createElement("img", ["slide-in"], {
    src: product.image,
    alt: product.name,
    width: "100%",
    height: "auto",
  });
  imgContainer.appendChild(imgElement);
  // ********************
  const infoWrapper = createElement("div", ["info-wrapper", "max-w-[50%]"]);

  const h2 = createElement("h2", ["text-2xl", "font-bold", "slide-in"], {
    innerText: product.name,
  });

  const h3 = createElement("h3", ["text-xl", "font-bold", "slide-in"], {
    innerText: `$${product.price}`,
  });

  const p = createElement("p", ["slide-in"], {
    innerText: product.description,
  });

  const productContainer = document.createElement("div");
  const treeRating = createStarRating(product.stars);
  productContainer.appendChild(treeRating);

  infoWrapper.appendChild(h2);
  infoWrapper.appendChild(h3);
  infoWrapper.appendChild(productContainer);
  infoWrapper.appendChild(p);

  // *******************
  flexContainer.appendChild(imgContainer);
  flexContainer.appendChild(infoWrapper);
  featuredProductsContainer.appendChild(flexContainer);
};

const createStarRating = (rating) => {
  const starContainer = document.createElement("div");
  for (let i = 1; i <= 5; i++) {
    const star = document.createElement("span");
    star.innerHTML = "";
    star.innerHTML = i <= rating ? "★" : "☆";
    star.className = "star";
    star.style.animationDelay = `${i * 0.1}s`;
    star.classList.add("slide-in");
    starContainer.appendChild(star);
  }
  return starContainer;
};
