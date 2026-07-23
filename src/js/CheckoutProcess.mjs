import { getLocalStorage } from "./utils.mjs";

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
        this.displayOrderDetails();
        // this.list = getLocalStorage(this.key);
        // this.calculateItemSummary();
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
        const tax = 0.06;
        let subtotal = 0;

        cartItems.forEach(item => {
            const price = item.FinalPrice;
            subtotal += price;
        });

        const priceTax = subtotal * tax;
        const finalPrice = subtotal + priceTax;

        return finalPrice;
        // document.querySelector('#tax').textContent = finalPrice;
    }

    // ------------------- SHIPPING COST -----------------
    calculateShippingCost() {
        const cartItems = getLocalStorage("so-cart") || [];
        let shippingCost = 0;

        if (cartItems.length === 0) {
            shippingCost = 0;
        }

        else {
            cartItems.forEach((item, index) => {
                if (index === 0) {
                    shippingCost += 10;
                }

                else {
                    shippingCost += 2;
                }
            });
        }

        return shippingCost;
    }

    // ------------------- TOTAL ORDER COST -----------------

    calculateOrderTotal() {
        const subtotal = this.calculateItemSubtotal();
        const tax = this.calculateTaxTotal();
        const shippingCost = this.calculateShippingCost();

        const totalPrice = subtotal + tax + shippingCost;

        return totalPrice;
    }

    // ------------------- DISPLAYING COSTS TO PAGE -----------------

    displayOrderDetails() {
        const subtotal = this.calculateItemSubtotal();
        const tax = this.calculateTaxTotal();
        const shippingCost = this.calculateShippingCost();
        const totalPrice = this.calculateOrderTotal();

        document.querySelector('#subtotal').innerHTML = subtotal;
        document.querySelector('#tax').innerHTML = tax;
        document.querySelector('#shipping-cost').innerHTML = shippingCost;
        document.querySelector("#total-price").innerHTML = `$${totalPrice.toFixed(2)}`;
    }
}

// ------------------- SUBTOTAL COST -----------------
// function calculateItemSubtotal() {
//     const cartItems = getLocalStorage("so-cart");

//     if (cartItems && cartItems.length > 0) {

//         //calculates the total with FinalPrice of each one
//         const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);

//         return total;

//         // const review = document.querySelector(".review");
//     }

//     else {
//         //in case the cart is empty
//         document.querySelector(".review").innerHTML = "No items in cart";
//     }
// }

// // ------------------- TAX COST -----------------
// function calculateTaxTotal() {
//     const cartItems = getLocalStorage("so-cart") || [];
//     const tax = 0.06;
//     let subtotal = 0;

//     cartItems.forEach(item => {
//         const price = item.FinalPrice;
//         subtotal += price;
//     });

//     const priceTax = subtotal * tax;
//     const finalPrice = subtotal + priceTax;

//     return finalPrice;
//     // document.querySelector('#tax').textContent = finalPrice;
// }

// // ------------------- SHIPPING COST -----------------
// function calculateShippingCost() {
//     const cartItems = getLocalStorage("so-cart") || [];
//     let shippingCost = 0;

//     if (cartItems.length === 0) {
//         shippingCost = 0;
//     }

//     else {
//         cartItems.forEach((item, index) => {
//             if (index === 0) {
//                 shippingCost += 10;
//             }

//             else {
//                 shippingCost += 2;
//             }
//         });
//     }

//     return shippingCost;
// }

// // ------------------- TOTAL ORDER COST -----------------

// function calculateOrderTotal() {
//     const subtotal = this.calculateItemSubtotal();
//     const tax = this.calculateTaxTotal();
//     const shippingCost = this.calculateShippingCost();

//     const totalPrice = subtotal + tax + shippingCost;

//     return totalPrice;
// }

// // ------------------- DISPLAYING COSTS TO PAGE -----------------

// function displayOrderDetails() {
//     const subtotal = this.calculateItemSubtotal();
//     const tax = this.calculateTaxTotal();
//     const shippingCost = this.calculateShippingCost();
//     const totalPrice = this.calculateOrderTotal();

//     document.querySelector('#subtotal').innerHTML = subtotal;
//     document.querySelector('#tax').innerHTML = tax;
//     document.querySelector('#shipping-cost').innerHTML = shippingCost;
//     document.querySelector("#total-price").innerHTML = `$${totalPrice.toFixed(2)}`;
// }