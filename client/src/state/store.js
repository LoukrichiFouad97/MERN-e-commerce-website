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
    userListReducer,
    userDeleteReducer,
} from "./users/users.reducers";
import {
    orderDeliverReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderReducer,
} from "./order/order.reducers";

var reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdate: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    orderCreate: orderReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderDeliver: orderDeliverReducer,
});

var cartItemsFromStorage = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

var userLoginFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

var shippigAddressFromStorage = localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {};

var middlewares = [thunk];
var initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippigAddressFromStorage,
    },
    userLogin: { userInfo: userLoginFromStorage },
};

var store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
