import axios from "axios";

import {
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
} from "./productDetails.constants";

export function getProductDetails(id) {
    return async function getProductDetailsHandler(dispatch) {
        try {
            dispatch({ type: PRODUCT_DETAILS_REQUEST });

            var { data } = await axios.get(`/api/products/${id}`);
            dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error });
        }
    };
}
