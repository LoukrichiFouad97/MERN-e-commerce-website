import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cartReducer } from "./cart/cart.reducers";
import { productListReducer } from "./products/products.reducers";
import { productDetailsReducer } from "./productDetails/productDetails.reducers";

var reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

var cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

var middlewares = [thunk];
var initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
};

var store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
