import express from "express";

import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
} from "./Order.controller.js";
import { requireSignin } from "../../middlewares/auth.js";

export var orderRoute = express.Router();

orderRoute.route("/").post(requireSignin, addOrderItems);
orderRoute.route("/:id").get(requireSignin, getOrderById);
orderRoute.route("/:id/pay").put(requireSignin, updateOrderToPaid);
orderRoute.route("/:id/deliver").put(requireSignin, updateOrderToDelivered);
