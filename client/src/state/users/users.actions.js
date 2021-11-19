import axios from "axios";

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_LOGOUT,
} from "./users.constants";

export { login, logout, register };

function login(email, password) {
    return async function (dispatch) {
        try {
            dispatch({ type: USER_LOGIN_REQUEST });

            var config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            var { data } = await axios.post(
                "/api/users/login",
                {
                    email,
                    password,
                },
                config
            );

            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            // store user info in browser storage
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_LOGIN_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function logout() {
    return function (dispatch) {
        localStorage.removeItem("userInfo");
        dispatch({ type: USER_LOGOUT });
        document.location.href = "/signin";
    };
}

function register(name, email, password) {
    return async function (dispatch) {
        try {
            dispatch({ type: USER_REGISTER_REQUEST });

            var config = {
                headers: {
                    "Content-Type": "application/json",
                },
            };

            var { data } = await axios.post(
                "/api/users",
                {
                    name,
                    email,
                    password,
                },
                config
            );

            dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
            dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

            // store user info in browser storage
            localStorage.setItem("userInfo", JSON.stringify(data));
        } catch (error) {
            dispatch({
                type: USER_REGISTER_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}