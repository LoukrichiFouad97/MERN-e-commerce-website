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
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DETAILS_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_UPDATE_REQUEST,
} from "./users.constants";

export {
    login,
    logout,
    register,
    getUserDetails,
    updateUserProfile,
    getAllUsers,
    deleteUser,
    updateUser,
};

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
        dispatch({ type: USER_DETAILS_RESET });
        dispatch({ type: USER_LIST_RESET });
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

            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            var { data } = await axios.get(`/api/users/${userId}`, config);

            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
        } catch (error) {
            var message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: USER_DETAILS_FAIL,
                payload: message,
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

function getAllUsers() {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: USER_LIST_REQUEST });
            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            var { data } = await axios.get(`/api/users/`, config);

            dispatch({ type: USER_LIST_SUCCESS, payload: data });
        } catch (error) {
            dispatch({
                type: USER_LIST_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function deleteUser(userId) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: USER_DELETE_REQUEST });
            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            await axios.delete(`/api/users/${userId}`, config);

            dispatch({ type: USER_DELETE_SUCCESS });
        } catch (error) {
            dispatch({
                type: USER_DELETE_FAIL,
                payload:
                    error.response && error.response.data.message
                        ? error.response.data.message
                        : error.message,
            });
        }
    };
}

function updateUser(user) {
    return async function (dispatch, getState) {
        try {
            dispatch({ type: USER_UPDATE_REQUEST });
            var {
                userLogin: { userInfo },
            } = getState();

            var config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            var { data } = await axios.put(
                `/api/users/${user._id}`,
                user,
                config
            );

            dispatch({ type: USER_UPDATE_SUCCESS });
            dispatch({ type: USER_DETAILS_SUCCESS, payload: data });

            dispatch({ type: USER_DETAILS_RESET });
        } catch (error) {
            var message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;

            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
                type: USER_UPDATE_FAIL,
                payload: message,
            });
        }
    };
}
