import axios from "axios";

import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_REQUEST,
    ORDER_PAY_FAIL,
    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS,
    ORDER_DELIVER_FAIL,
} from "./order.constants";

import { logout } from "../users/users.actions";

export { createOrder, getOrderDetails, payOrder, deliverOrder };

function createOrder(order) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: ORDER_CREATE_REQUEST });

            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            var { data } = await axios.post("/api/orders", order, config);
            dispatch({ type: ORDER_CREATE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_CREATE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function getOrderDetails(id) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: ORDER_DETAILS_REQUEST });

            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            var { data } = await axios.get(`/api/orders/${id}`, config);
            dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function payOrder(orderId, paymentResult) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: ORDER_PAY_REQUEST });
            var { userLogin: userInfo } = getState();
            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            var { data } = await axios.put(
                `/api/orders/${orderId}/pay`,
                paymentResult,
                config
            );
            dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: ORDER_PAY_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function deliverOrder(order) {
    return async function (dispatch, getState) {
        try {
            dispatch({
                type: ORDER_DELIVER_REQUEST,
            });

            const {
                userLogin: { userInfo },
            } = getState();

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            const { data } = await axios.put(
                `/api/orders/${order._id}/deliver`,
                {},
                config
            );

            dispatch({
                type: ORDER_DELIVER_SUCCESS,
                payload: data,
            });
        } catch (error) {
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: ORDER_DELIVER_FAIL,
                payload: message,
            });
        }
    };
}
