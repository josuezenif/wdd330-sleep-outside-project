import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("products");

const product = new ProductDetails(productId, dataSource);
product.init();

// CALLING FUNCTION
console.log(product);
const wishButton = document.querySelector("#addToWishList");
wishButton.addEventListener('click', addToWishList);

function addToWishList() {

    // Get existing wish list
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Verify if it exists
    const exists = wishlist.find(item => item.Id === productId);

    if (!exists) {
        addProductToWishList(product);

        alert("Product added to wish list!");
    }

    else {
        alert("Product already in wish list");
    }
}

function addProductToWishList(product) {
    const productList = getLocalStorage("wishlist") || [];
    productList.push(product);
    setLocalStorage("wishlist", productList);
}



// function addProductToCart(product) {
//   const productList = getLocalStorage("so-cart") || [];
//   productList.push(product);
//   setLocalStorage("so-cart", productList);
// }
// // add to cart button event handler
// async function addToCartHandler(e) {
//   const product = await dataSource.findProductById(e.target.dataset.id);
//   addProductToCart(product);
// }

// // add listener to Add to Cart button
// document
//   .getElementById("addToCart")
//   .addEventListener("click", addToCartHandler);
