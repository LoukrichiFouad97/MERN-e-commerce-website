import axios from "axios";

import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "./cart.constants";

export function addToCart(id, qty) {
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
