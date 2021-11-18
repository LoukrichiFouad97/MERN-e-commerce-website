import express from "express";
import { getAllProducts, getProductById } from "./Product.controller.js";

export var productRoute = express.Router();

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
productRoute.route("/").get(getAllProducts);

// @desc    Fetch singal product by its id
// @route   GET /api/products/id
// @access  Public
productRoute.route("/:id").get(getProductById);

