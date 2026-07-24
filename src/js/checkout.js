import CheckoutProcess from "./CheckoutProcess.mjs";
import { getLocalStorage } from "./utils.mjs";

const order = new CheckoutProcess("so-cart", ".checkout-summary");
order.init();

// Add event listeners to fire calculateOrderTotal when the user changes the zip code
document
    .querySelector("#zip")
    .addEventListener("blur", order.calculateOrderTotal.bind(order));

// listening for click on the button
document.querySelector("#checkoutSubmit").addEventListener("click", () => {
    const form = document.forms["checkout"];
    const check_status = form.checkValidity();
    form.reportValidity();

    if (check_status) {
        order.checkout();
        localStorage.removeItem('so-cart');
    }
});
