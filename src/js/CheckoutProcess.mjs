import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

function formDataToJSON(formElement) {
    // convert the form data to a JSON object
    const formData = new FormData(formElement);
    const convertedJSON = {};

    formData.forEach((value, key) => {
        convertedJSON[key] = value;
    });
    return convertedJSON;
}

function packageItems(items) {
    const simplifiesItems = items.map((item) => {
        console.log(item);
        return {
            id: item.Id,
            price: item.FinalPrice,
            name: item.Name,
            quantity: 1
        };
    });
    return simplifiesItems;
}


export default class CheckoutProcess {
    constructor(key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = [];
        this.itemTotal = 0;
        this.shipping = 0; // Add $10 for first item and $2 for each additional item after that
        this.tax = 0; // 6% on subtotal
        this.orderTotal = 0;
    }

    init() {
        this.list = getLocalStorage(this.key);
        this.displayOrderDetails();
    }


    totalItemsInCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        return cartItems.length;
    }

    // ------------------- SUBTOTAL COST -----------------
    calculateItemSubtotal() {
        const cartItems = getLocalStorage("so-cart");

        if (cartItems && cartItems.length > 0) {

            //calculates the total with FinalPrice of each one
            const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

            return total;

            // const review = document.querySelector(".review");
        }

        else {
            //in case the cart is empty
            document.querySelector(".review").innerHTML = "No items in cart";
        }
    }

    // ------------------- TAX COST -----------------
    calculateTaxTotal() {
        const cartItems = getLocalStorage("so-cart") || [];
        this.tax = 0.06;
        let subtotal = 0;

        cartItems.forEach(item => {
            const price = item.FinalPrice;
            subtotal += price;
        });

        const priceTax = subtotal * this.tax;

        return priceTax;
    }

    // ------------------- SHIPPING COST -----------------
    calculateShippingCost() {
        const cartItems = getLocalStorage("so-cart") || [];
        this.shipping = 0;

        if (cartItems.length === 0) {
            this.shipping = 0;
        }

        else {
            cartItems.forEach((item, index) => {
                if (index === 0) {
                    this.shipping += 10;
                }

                else {
                    this.shipping += 2;
                }
            });
        }

        return this.shipping;
    }

    // ------------------- TOTAL ORDER COST -----------------

    calculateOrderTotal() {
        const subtotal = this.calculateItemSubtotal();
        const tax = this.calculateTaxTotal();
        const shippingCost = this.calculateShippingCost();

        this.orderTotal = subtotal + tax + shippingCost;

        return this.orderTotal;
    }

    // ------------------- DISPLAYING COSTS TO PAGE -----------------

    displayOrderDetails() {
        const countItems = this.totalItemsInCart();
        const subtotal = this.calculateItemSubtotal();
        const tax = this.calculateTaxTotal();
        const shippingCost = this.calculateShippingCost();
        const totalPrice = this.calculateOrderTotal();

        document.querySelector('#totalItems').innerHTML = countItems;
        document.querySelector('#subtotal').innerHTML = '$' + subtotal;
        document.querySelector('#tax').innerHTML = '$' + tax.toFixed(2);
        document.querySelector('#shipping-cost').innerHTML = '$' + shippingCost;
        document.querySelector("#total-price").innerHTML = `$${totalPrice.toFixed(2)}`;
    }

    async checkout() {
        const formElement = document.forms["checkout"];
        const order = formDataToJSON(formElement);

        order.orderDate = new Date().toISOString();
        order.orderTotal = this.orderTotal;
        order.tax = this.tax;
        order.shipping = this.shipping;
        order.items = packageItems(this.list);
        console.log(order); // <<-------------- INFORMATION OF THE CLIENT WITH EVERYTHING THEY ORDERED

        try {
            const response = await services.checkout(order); // checkout(order) is not a function
            console.log(response);
        }

        catch (err) {
            console.log(err);
        }
    }
}
