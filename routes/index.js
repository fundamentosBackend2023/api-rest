const express = require('express');
const mainRouter = express.Router();
const clientRouter = require('./clientsRoutes');
const orderRoutes = require('./ordersRoutes');

function linkRoutes(app){
    app.use('/api/v1', mainRouter);
    mainRouter.use('/clients', clientRouter);
    mainRouter.use('/orders', orderRoutes);
}

module.exports = linkRoutes;