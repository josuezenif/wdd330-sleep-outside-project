import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";
import ProductList from "./ProductList.mjs";
import ExternalServices from "./ExternalServices.mjs";
import { getParam } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart");

  if (cartItems && cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    //calculates the total with FinalPrice of each one
    const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

    const cartFooter = document.querySelector(".cart-footer");
    console.log(total);
    document.querySelector(".cart-total").innerHTML =
      `Total: $${total.toFixed(2)}`;
    cartFooter.classList.remove("hide");

    removeItemFromCart();
  }

  else {
    //in case the cart is empty
    document.querySelector(".product-list").innerHTML = "";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

function cartItemTemplate(item) {   //  -------------------- CART TEMPLATE -----------
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?products=${item.Id}" class="cart-card__image">
    <img
      src="${item.Images.PrimarySmall}"
      alt="${item.Name}"
    />
  </a>
  <a href="/product_pages/?products=${item.Id}">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
  <section class="removeButton">
    <button class="remove-btn" data-id="${item.Id}">Remove</button>
  </section>
</li>`;

  return newItem;
}

renderCartContents();

function cartItemTemplate2(item) { // ---------- wish list template ----------
  const newItem = `<li class="cart-card divider">
  <a href="/product_pages/?products=${item.productId}" class="cart-card__image">
    <img
      src="${item.product.Images.PrimarySmall}"
      alt="${item.product.Name}"
    />
  </a>
  <a href="/product_pages/?products=${item.productId}">
    <h2 class="card__name">${item.product.Name}</h2>
  </a>
  <p class="cart-card__color">${item.product.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.product.FinalPrice}</p>
</li>`;

  return newItem;
}

// WISH LIST TO CART INDEX HTML
function renderWishlist() {
  const wishlist = getLocalStorage("wishlist") || [];

  const container = document.getElementById("wish-list");

  wishlist.forEach(product => {
    const section = document.createElement("section");
    const template = cartItemTemplate2(product);

    section.innerHTML = template;
    container.appendChild(section);
  });

}
renderWishlist();

// ------------------------- REMOVING ITEM FROM CART -----------------
function removeItem(productId) {
  const cartItems = getLocalStorage('so-cart') || [];
  const newCart = cartItems.filter(item => item.Id !== productId);

  setLocalStorage('so-cart', newCart);
}

const cartItems = getLocalStorage('so-cart') || [];

function removeItemFromCart() {
  const buttons = document.querySelectorAll('.remove-btn'); // querySelectorAll() -----> Returns an array!!

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      removeItem(button.dataset.id);
      renderCartContents();
    });
  });
}

removeItemFromCart();


