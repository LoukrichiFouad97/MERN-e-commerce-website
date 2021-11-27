import express from "express";
import { getAllProducts, getProductById } from "./Product.controller.js";

export var productRoute = express.Router();

productRoute.route("/").get(getAllProducts);
productRoute.route("/:id").get(getProductById);

