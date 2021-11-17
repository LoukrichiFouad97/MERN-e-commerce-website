import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./cart.constants";

export { addToCart, removeFromCart };

function addToCart(id, qty) {
    return async function addToCartThunk(dispatch, getState) {
        var { data } = await axios.get(`/api/products/${id}`);

        dispatch({
            type: CART_ADD_ITEM,
            payload: {
                productId: data._id,
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
