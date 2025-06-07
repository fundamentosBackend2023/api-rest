const express = require('express');
const router = express.Router();
const Client = require('../services/clientServices');
const validationMiddleware = require('./../utils/validationMw');
const { clientSchema } = require('../utils/schemas');

router.get('/', async (req, res) => {
    let min = req.query.min;
    let max = req.query.max;

    const filteredClients = await Client.getAllClients(min, max);

    res.status(200).json({
        message: 'Client list',
        clients: filteredClients
    });
});

router.get('/vip', async (req, res) => {
    const threshold = 1000;
    const vipClients = await Client.getVip(threshold);
    res.status(200).json({
        message: 'VIP Clients',
        vip: vipClients
    });
});

router.get('/:id', async (req, res, next) => {
    try{
        const clientIndex = req.params.id;
        const retrievedClient = await Client.getOne(clientIndex);
        res.status(200).json({
            message: retrievedClient
        });
    }catch(error){
        next(error);
    }
});


router.post('/',
    validationMiddleware(clientSchema),
    async (req, res, next) => {
    const receivedClient = req.body;
    await Client.createClient(receivedClient);
    res.status(201).json({
        message: 'client successufully registered'
    });
});

router.put('/:id', async (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    await Client.updateClient(clientIndex, receivedInfo);
    res.status(200).json({
        message: 'client updated'
    });
});


router.patch('/addToSpentAmount/:id', async (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount: amountToAdd } = req.body;
    updatedClient = await Client.addSpentAmount(clientIndex, amountToAdd);
    res.status(200).json({
        newInfo: updatedClient
    });
});

router.delete('/:id', async (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = await Client.deleteClient(clientIndex);
    res.status(200).json({
        message: 'client delete',
        client: clientToDelete
    });
});

module.exports = router;