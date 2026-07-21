import { productDetailsTemplate } from "./ProductDetails.mjs";
import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product) {
    return `
    <li class="product-card">
        <a href="product_pages/?products=${product.Id}">
        <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
        <h2>${product.NameWithoutBrand}</h2>
        <h3>${product.Brand.Name}</h3>
        <p class="product-card__price">$${product.ListPrice}</p>
        </a>
    </li>
    `;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    async init() {
        const list = await this.dataSource.getData(this.category);
        this.renderList(list);
        // document.querySelector(".title").textContent = this.category;
    }

    renderList(list) {
        // const htmlStrings = list.map(productCardTemplate);
        // this.listElement.insertAdjacentHTML('afterbegin', htmlStrings.join(''));

        // apply using new fuction instead of code above
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}
