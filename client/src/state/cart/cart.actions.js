import axios from "axios";

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD,
} from "./cart.constants";

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };

function addToCart(id, qty) {
    return async function addToCartThunk(dispatch, getState) {
        var { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                product: data._id,
                image: data.image,
                name: data.name,
                price: data.price,
                countInStock: data.countInStock,
                qty,
            },
        });

        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };
}

function removeFromCart(id) {
    return async function removeFromCartThunk(dispatch, getState) {
        dispatch({ type: CART_REMOVE_ITEM, payload: id });
        localStorage.setItem(
            "cartItems",
            JSON.stringify(getState().cart.cartItems)
        );
    };
}

function saveShippingAddress(data) {
    return async function (dispatch) {
        dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
        localStorage.setItem("shippingAddress", JSON.stringify(data));
        console.log("shipping address saved successfully");
    };
}

function savePaymentMethod(data) {
    return async function (dispatch) {
        dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
        localStorage.setItem("paymentMethod", JSON.stringify(data));
        console.log("paymentMethod saved successfully");
    };
}
