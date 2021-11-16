import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../state/cart/cart.actions";

export function CartScreen() {
    var dispatch = useDispatch();
    var navigate = useNavigate();
    var location = useLocation();
    var { productId } = useParams();

    var qty = location.search.split("=")[1];

    useEffect(
        function handleCartEffect() {
            dispatch(addToCart(productId, qty));
        },
        [dispatch, productId, qty]
    );

    return (
        <div>
            <h1>Cart sreen </h1>
        </div>
    );
}
