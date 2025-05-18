const express = require('express');
const app = express();

const port = 3000;

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

app.listen(port, () => {
    console.log('Listening on port',port);
});

