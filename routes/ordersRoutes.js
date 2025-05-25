const express = require('express');
const router = express.Router();
const Order = require('../services/ordersServices');

router.get('/', (req, res) => {
    const orders = Order.getAllOrders();
    res.status(200).json({
        message: 'Orders list',
        clients: orders
    });
});

router.post('/', (req, res) => {
    const receivedOrder = req.body;
    const { newAmount, clientId } = req.body
    Order.createOrder(receivedOrder, clientId, newAmount);
    res.status(201).json({
        message: 'order successufully registered'
    });
});

module.exports = router;