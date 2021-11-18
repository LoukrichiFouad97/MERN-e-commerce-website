import express from "express";
import dotenv from "dotenv";
import colors from "colors";

import { dbConnect } from "./config/dbConnect.js";
import { errorHandler, handleNotFound } from "./middlewares/errorHandler.js";

// Routes
import { productRoute } from "./api/Product/Product.route.js";
import { userRoute } from "./api/User/User.route.js";

dotenv.config();
dbConnect();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);

// Middlewares
app.all("*", handleNotFound);
app.use(errorHandler);

// Server Listening
var port = process.env.PORT || 5000;
app.listen(
    port,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow
            .bold
    )
);
