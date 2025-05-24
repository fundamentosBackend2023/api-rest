const express = require('express');
const app = express();

const port = process.env.PORT;

//! Middlewares
const globalMw = (req, res, next) => {
    console.log('hello from global mw');
    next();
}

const rootMw = (req, res, next) => {
    console.log('hello from root mw');
    next();
}

const routeMw = (req, res, next) => {
    console.log('This is a route mw');
    next();
}

const greetingMw = (req, res, next) => {
    console.log('GREETING MW');
    next();
}

const mwClosure = (firstName, color) => {
    return (req, res, next) => {
        console.log('Hello',firstName,'i know your fc is',color);
        next();
    }
}

app.use(express.json())
app.use('/', rootMw);
app.use(globalMw);
app.use('/greeting', routeMw);

app.get('/', (req, res) => {
    res.send('Hello from server');
    console.log('Printed after send');
});


app.get('/greeting',
    greetingMw,
    mwClosure('miriam','verde'),
    (req, res) => {
    res.status(200).json({
        greeting: 'Hello from api'
    });
});

app.get('/greeting/seasonal', (req, res) => {
    res.status(200).json({
        greeting: 'Happy Halloween'
    });
});


clientsDB = {}


app.get('/clients', (req, res) => {
    let min = req.query.min;
    let max = req.query.max;

    if(!max) max = Infinity;
    if(!min) min = 0;

    const filteredClients = {};
    let filteredCounter = 0;

    for([key, client] of Object.entries(clientsDB)){
        if(client.spentAmount > min && client.spentAmount < max){
            filteredClients[filteredCounter] = client;
            filteredCounter++;
        }
    }

    res.status(200).json({
        message: 'Client list',
        clients: filteredClients
    });
});

app.get('/clients/vip', (req, res) => {
    const threshold = 1000;

    const vipClients = {}
    let vipCounter = 0

    for([key, client] of Object.entries(clientsDB)){
        if(client.spentAmount >= threshold){
            vipClients[vipCounter] = client;
            vipCounter++;
        }
    }

    res.status(200).json({
        message: 'VIP Clients',
        vip: vipClients
    });
});

app.get('/clients/:id', (req, res) => {
    const clientIndex = req.params.id;
    const retrievedClient = clientsDB[clientIndex];
    res.status(200).json({
        message: retrievedClient
    });
});



app.post('/clients', (req, res) => {
    const receivedClient = req.body;
    console.log({receivedClient})
    const clientIndex = Object.keys(clientsDB).length;
    clientsDB[clientIndex] = receivedClient;
    res.status(201).json({
        message: 'client successufully registered'
    });
});

app.put('/clients/:id', (req, res) => {
    const receivedInfo = req.body;
    const { id: clientIndex } = req.params;
    clientsDB[clientIndex] = receivedInfo;
    res.status(200).json({
        message: 'client updated'
    });
});

const addSpentAmount = (id, amount) => {
    clientsDB[id].spentAmount += amount
}

app.patch('/clients/addToSpentAmount/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const { spentAmount: amountToAdd } = req.body;
    addSpentAmount(clientIndex, amountToAdd);
    res.status(200).json({
        newInfo: clientsDB[clientIndex]
    });
});

app.delete('/clients/:id', (req, res) => {
    const { id: clientIndex } = req.params;
    const clientToDelete = clientsDB[clientIndex];
    delete clientsDB[clientIndex];
    res.status(200).json({
        message: 'client delete',
        client: clientToDelete
    });
});

//! API Orden

const ordersDB = {}

app.get('/orders', (req, res) => {
    res.status(200).json({
        message: 'Orders list',
        clients: ordersDB
    });
});

app.post('/orders', (req, res) => {
    const receivedOrder = req.body;
    const { newAmount, clientId } = req.body
    const orderIndex = Object.keys(ordersDB).length;
    ordersDB[orderIndex] = receivedOrder;
    addSpentAmount(clientId, newAmount);
    res.status(201).json({
        message: 'order successufully registered'
    });
});




app.listen(port, () => {
    console.log('Listening on port',port);
});

