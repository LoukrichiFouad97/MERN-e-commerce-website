import express from "express";

import {
    authUser,
    createUser,
    getUserProfile,
    updateUserProfile,
} from "./User.controller.js";
import { requireSignin } from "../../middlewares/auth.js";

export var userRoute = express.Router();

userRoute.post("/login", authUser);
userRoute
    .route("/profile")
    .get(requireSignin, getUserProfile)
    .put(requireSignin, updateUserProfile);
userRoute.route("/").post(createUser);
