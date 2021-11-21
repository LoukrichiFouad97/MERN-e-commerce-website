import asyncHandler from "express-async-handler";

import { User } from "./User.model.js";
import { generateToken } from "../../utils/generateToken.js";

export var authUser = asyncHandler(authUserHandler);
export var getUserProfile = asyncHandler(getUserProfileHandler);
export var createUser = asyncHandler(createUserHandler);
export var updateUserProfile = asyncHandler(updateUserProfileHandler);

//*************************  Functionality ***********************//
// @desc    Authenticate user & get token
// @route   POST /api/users/login
// @access  Public
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

// @desc    Get user profile
// @route   POST /api/users/profile
// @access  Private
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

// @desc    Create user profile
// @route   POST /api/users/
// @access  Public
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

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
async function updateUserProfileHandler(req, res) {
    var user = await User.findById(req.user);
    console.log(req.user)

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }

        var updatedUser = await user.save();

        res.status(201).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
}
