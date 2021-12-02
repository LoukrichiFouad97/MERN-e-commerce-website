import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";

import { dbConnect } from "./config/dbConnect.js";
import { errorHandler, handleNotFound } from "./middlewares/errorHandler.js";

// Routes
import { productRoute } from "./api/Product/Product.route.js";
import { userRoute } from "./api/User/User.route.js";
import { orderRoute } from "./api/Order/Order.route.js";

dotenv.config();
dbConnect();
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/orders", orderRoute);
app.get("/api/config/paypal", (req, res) =>
    res.send(process.env.PAYPAL_CLIENT_ID)
);

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
