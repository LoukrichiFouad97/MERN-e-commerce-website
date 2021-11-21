import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { cartReducer } from "./cart/cart.reducers";
import { productListReducer } from "./products/products.reducers";
import { productDetailsReducer } from "./productDetails/productDetails.reducers";
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
} from "./users/users.reducers";

var reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
});

var cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

var userLoginFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

var middlewares = [thunk];
var initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
    },
    userLogin: { userInfo: userLoginFromStorage },
};

var store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
