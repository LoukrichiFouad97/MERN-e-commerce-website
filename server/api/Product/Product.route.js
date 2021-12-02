import express from "express";
import {
    createProductReview,
    getAllProducts,
    getProductById,
} from "./Product.controller.js";
import { requireSignin } from "../../middlewares/auth.js";

export var productRoute = express.Router();

productRoute.route("/").get(getAllProducts);
productRoute.route("/:id").get(getProductById);
productRoute.route("/:id/reviews").post(requireSignin, createProductReview);
