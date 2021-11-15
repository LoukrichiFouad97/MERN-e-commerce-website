import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { productListReducer } from "./products/products.reducers";
import { productDetailsReducer } from "./productDetails/productDetails.reducers";

var reducers = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
});

var middlewares = [thunk];
var initialState = {};

var store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
