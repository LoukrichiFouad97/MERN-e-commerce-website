import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

import { User } from "../api/User/User.model.js";

export { requireSignin, isAdmin };

var isAdmin = asyncHandler(isAdminHandler);
var requireSignin = asyncHandler(requireSigninHandler);

//*************************  Functionality ***********************//
async function requireSigninHandler(req, res, next) {
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
}

async function isAdminHandler(req, res, next) {
    var user = await User.findById(req.user);
    if (user.isAdmin) {
        next();
    } else {
        res.status(401).json({
            status: "fail",
            statusCode: 401,
            message: "You are not authorized",
        });
    }
}
