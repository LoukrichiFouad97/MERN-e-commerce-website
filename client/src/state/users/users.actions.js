import axios from "axios";

import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_REQUEST,
    USER_REGISTER_FAIL,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_REQUEST,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_FAIL,
} from "./users.constants";

export { login, logout, register, getUserDetails, updateUserProfile };

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

function getUserDetails(userId) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: USER_DETAILS_REQUEST });
            console.log("sdaf");
            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            var { data } = await axios.get(`/api/users/${userId}`, config);
            console.log(data);

            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_DETAILS_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function updateUserProfile(user) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            var { data } = await axios.put(`/api/users/profile`, user, config);

            dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_UPDATE_PROFILE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}
