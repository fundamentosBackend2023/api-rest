const ordersDB = require('./../libs/orders');
const Client = require('./clientServices');

class Order {

    static getAllOrders(){
        const retrievedOrders = ordersDB;
        return retrievedOrders;
    }

    static createOrder(receivedOrder, clientId, newAmount){
        const orderIndex = Object.keys(ordersDB).length;
        ordersDB[orderIndex] = receivedOrder;
        Client.addSpentAmount(clientId, newAmount);
        return true;
    }

}

module.exports = Order;