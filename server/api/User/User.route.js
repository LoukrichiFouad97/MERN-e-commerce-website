import express from "express";

import {
    authUser,
    createUser,
    deleteUser,
    getAllUsers,
    getUserProfile,
    updateUserProfile,
} from "./User.controller.js";
import { isAdmin, requireSignin } from "../../middlewares/auth.js";

export var userRoute = express.Router();

userRoute.route("/").post(createUser).get(requireSignin, isAdmin, getAllUsers);
userRoute.post("/login", authUser);
userRoute
    .route("/profile")
    .get(requireSignin, getUserProfile)
    .put(requireSignin, updateUserProfile);

userRoute.route("/:id").delete(requireSignin, isAdmin, deleteUser);
