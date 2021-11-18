import express from "express";

import { authUser, getUserProfile, createUser } from "./User.controller.js";
import { requireSignin } from "../../middlewares/auth.js";

export var userRoute = express.Router();

// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
userRoute.post("/login", authUser);

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private
userRoute.route("/profile").get(requireSignin, getUserProfile);

// @desc    Creare user profile
// @route   POST /api/users/
// @access  Public
userRoute.route("/").post(createUser);
