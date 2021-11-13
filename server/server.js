import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import products from "./data/products.js";
import { dbConnect } from "./config/dbConnect.js";
dotenv.config();

dbConnect();
var app = express();

app.get("/", function handleGetReq(req, res) {
    res.send("Hello in node server");
});

app.get("/api/products", function (req, res) {
    res.json(products);
});

app.get("/api/products/:id", function (req, res) {
    var product = products.find(function findProduct(product) {
        return product._id === req.params.id;
    });

    res.json(product);
});

var port = process.env.PORT || 5000;
app.listen(
    5000,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold
    )
);
