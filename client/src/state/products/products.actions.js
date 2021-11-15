import axios from "axios";

import {
    PRODUCTS_LIST_FAIL,
    PRODUCTS_LIST_REQUEST,
    PRODUCTS_LIST_SUCCESS,
} from "./products.constants";

export { getAllProducts };

function getAllProducts() {
    return async function (dispatch) {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST });

            var { data } = await axios.get("/api/products");
            dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: PRODUCTS_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}
