const express = require('express');
const app = express();

const { globalMw, rootMw, routeMw,
        greetingMw, mwClosure } = require('./utils/generalMiddlewares');
const { printErrorHandler, zodErrorHandler, boomErrorHandler,
        generalErrorHandler } = require('./utils/errorMiddlewares');
const config = require('./config/config');
const linkRoutes = require('./routes');

app.use(express.json())
app.use('/', rootMw);
app.use(globalMw);
app.use('/greeting', routeMw);

linkRoutes(app);

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

app.use(printErrorHandler);
app.use(zodErrorHandler);
app.use(boomErrorHandler);
app.use(generalErrorHandler);

app.listen(config.port, () => {
    console.log('Listening on port',config.port);
});

