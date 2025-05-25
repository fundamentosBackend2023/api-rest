const express = require('express');
const router = express.Router();
const Client = require('../services/clientServices');


router.get('/', (req, res) => {
    let min = req.query.min;
    let max = req.query.max;

    const filteredClients = Client.getAllClients(min, max);

    res.status(200).json({
        message: 'Client list',
        clients: filteredClients
    });
});

router.get('/vip', (req, res) => {
    const threshold = 1000;
    const vipClients = Client.getVip(threshold);
    res.status(200).json({
        message: 'VIP Clients',
        vip: vipClients
    });
});

router.get('/:id', (req, res) => {
    const clientIndex = req.params.id;
    const retrievedClient = Client.getOne(clientIndex);
    res.status(200).json({
        message: retrievedClient
    });
});


router.post('/', (req, res) => {
    const receivedClient = req.body;
    Client.createClient(receivedClient);
    res.status(201).json({
        message: 'client successufully registered'
    });
});

router.put('/:id', (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    Client.updateClient(clientIndex, receivedInfo);
    res.status(200).json({
        message: 'client updated'
    });
});


router.patch('/addToSpentAmount/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount: amountToAdd } = req.body;
    updatedClient = Client.addSpentAmount(clientIndex, amountToAdd);
    res.status(200).json({
        newInfo: updatedClient
    });
});

router.delete('/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = Client.deleteClient(clientIndex);
    res.status(200).json({
        message: 'client delete',
        client: clientToDelete
    });
});

module.exports = router;