import asyncHandler from "express-async-handler";

import { Order } from "./Order.model.js";

export {
    addOrderItems,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
    getMyOrders,
};

var addOrderItems = asyncHandler(addOrderItemsHandler);
var getOrderById = asyncHandler(getOrderByIdHandler);
var updateOrderToPaid = asyncHandler(updateOrderToPaidHandler);
var updateOrderToDelivered = asyncHandler(updateOrderToDeliveredHandler);
var getOrders = asyncHandler(getOrdersHandler);
var getMyOrders = asyncHandler(getMyOrdersHandler);


//*************************  Functionality ***********************//


// @desc    Create new order
// @route   POST /api/orders
// @access  Private
async function addOrderItemsHandler(req, res) {
    var {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length == 0) {
        res.status(400);
        throw new Error("No order items!!!");
    } else {
        var order = new Order({
            orderItems,
            user: req.user,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        var createdUser = await order.save();
        res.status(200).json(createdUser);
    }
}

// @desc    Get order by id
// @route   POST /api/orders/:id
// @access  Private
async function getOrderByIdHandler(req, res) {
    var order = await Order.findById(req.params.id).populate(
        "user",
        "name email"
    );

    if (order) {
        res.status(200).json(order);
    } else {
        res.status(400);
        throw new Error("No order items!!!");
    }
}

// @desc    Update order to paid
// @route   POST /api/orders/:id/pay
// @access  Private
async function updateOrderToPaidHandler(req, res) {
    var order = Order.findById(req.params.id);

    if (order) {
        order.paid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        };
        var paidOrder = await order.save();
        res.json(paidOrder);
    } else {
        res.status(404);
        throw new Error("order not found");
    }
}

// @desc    Update order to delivered
// @route   GET /api/orders/:id/deliver
// @access  Private/Admin
async function updateOrderToDeliveredHandler(req, res) {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isDelivered = true;
        order.deliveredAt = Date.now();

        const updatedOrder = await order.save();

        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
}

// @desc    Get logged in user ordres
// @route   GET /api/orders/myorders
// @access  Private
async function getMyOrdersHandler(req, res) {
    var myOrders = await Order.find({ user: req.user });
    res.json(myOrders);
}

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
async function getOrdersHandler(req, res) {
    const orders = await Order.find({}).populate("user", "id name");
    res.json(orders);
}
