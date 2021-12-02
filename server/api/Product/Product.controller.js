import asyncHandler from "express-async-handler";
import { Product } from "./Product.model.js";
import { User } from "../User/User.model.js";

export { getAllProducts, getProductById, getTopProducts, createProductReview };

var getAllProducts = asyncHandler(getAllProductsHandler);
var getProductById = asyncHandler(getProductByIdHandler);
var getTopProducts = asyncHandler(getTopProductsHandler);
var createProductReview = asyncHandler(createProductReviewHandler);

//*************************  Functionality ***********************//
// @desc    Get All products
// @route   GET /api/products/
// @access  Public
async function getAllProductsHandler(req, res) {
    var products = await Product.find({});
    res.status(200).json(products);
}

// @desc    Fetch singal products
// @route   GET /api/products/
// @access  Public
async function getProductByIdHandler(req, res) {
    var product = await Product.findById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: "Product not found" });
    }
}

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
async function getTopProductsHandler(req, res) {
    var products = await Product.find({}).sort({ rating: -1 }).limit(3);
    res.json(products);
}

// @desc    Get top rated products
// @route   GET /api/products/:id/reviews
// @access  Public
async function createProductReviewHandler(req, res) {
    var { rating, comment } = req.body;
    var product = await Product.findById(req.params.id);
    var user = await User.findById(req.user);

    if (product) {
        var alreadyReviewd = product.reviews.find(
            (r) => r.user.toString() == req.user.toString()
        );

        if (alreadyReviewd) {
            res.status(400);
            throw new Error("Product already reviewed");
        }

        var review = {
            name: user.name,
            rating: Number(rating),
            comment,
            user: req.user,
        };

        product.reviews.push(review);

        product.numReviews = product.reviews.length;
        product.rating =
            product.reviews.reduce((acc, item) => acc + item.rating, 0) /
            product.reviews.length;

        await product.save();
        res.status(201).json({ message: "Review added." });
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
}
