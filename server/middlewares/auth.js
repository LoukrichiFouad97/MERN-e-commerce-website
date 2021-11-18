import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../api/User/User.model.js";

export var requireSignin = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            let decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = decoded.id;
            next();
        } catch (error) {
            res.status(400).json({
                status: "fail",
                statusCode: 400,
                message: "Invalid token",
            });
        }
    }

    if (!token) {
        res.status(401).json({
            status: "fail",
            statusCode: 401,
            message: "Unauthorized access",
        });
    }
});
