import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

const productData = new ProductData("Tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", productData, element);

productList.init();