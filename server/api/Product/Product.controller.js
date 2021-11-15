import asyncHandler from "express-async-handler";
import { Product } from "./Product.model.js";

export { getAllProducts, getProductById };

var getAllProducts = asyncHandler(getAllProductsHandler);
var getProductById = asyncHandler(getProductByIdHandler);

//*************************  Functionality ***********************//
async function getAllProductsHandler(req, res) {
    var products = await Product.find({});
    res.status(200).json(products);
}

async function getProductByIdHandler(req, res) {
    var product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}
