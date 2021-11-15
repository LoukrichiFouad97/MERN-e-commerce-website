import express from "express";
import { getAllProducts, getProductById } from "./Product.controller.js";

var productRoutes = express.Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);

export default productRoutes;
