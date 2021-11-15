import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import { dbConnect } from "./config/dbConnect.js";
import { errorHandler, handleNotFound } from "./middlewares/errorHandler.js";

// Routes
import productRoutes from "./api/Product/Product.route.js";

dotenv.config();
dbConnect();
var app = express();

// Routes
app.use("/api/products", productRoutes);

// Middlewares
// app.use(handleNotFound);
app.all("*", handleNotFound);
app.use(errorHandler);

// Server
var port = process.env.PORT || 5000;
app.listen(
    port,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
            .bold
    )
);
