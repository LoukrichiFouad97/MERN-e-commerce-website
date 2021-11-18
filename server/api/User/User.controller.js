import asyncHandler from "express-async-handler";

import { User } from "./User.model.js";
import { generateToken } from "../../utils/generateToken.js";

export var authUser = asyncHandler(authUserHandler);
export var getUserProfile = asyncHandler(getUserProfileHandler);
export var createUser = asyncHandler(createUserHandler);

//*************************  Functionality ***********************//
async function authUserHandler(req, res) {
    var { email, password } = req.body;

    // find user in database by email
    var user = await User.findOne({ email });

    // if the user is found in the database then check if the password is correct
    if (user && (await user.comparePasswords(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
}

async function getUserProfileHandler(req, res) {
    var user = await User.findById(req.user).select("-password");

    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
        });
    } else {
        res.status(404).json({
            status: fail,
            statusCode: 404,
            message: `user with id ${req.user} not found.`,
        });
    }
}

async function createUserHandler(req, res) {
    var { name, email, password } = req.body;

    var userExist = await User.findOne({ email: email });
    if (userExist)
        res.status(200).json({
            status: "fail",
            statusCode: 200,
            message: "User already exists",
        });

    var user = await User.create({
        name: name,
        email: email,
        password: password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            isAdmin: user.isAdmin,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400).json({
            status: "fail",
            statusCode: 400,
            message: "Invalide user data.",
        });
    }
}
