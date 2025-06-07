const mongoose = require('mongoose');
const config = require('../config/config');

const connectToMongo = async () => {
    await mongoose.connect(config.dbUrl);
    console.log('Successfully connected to Mongo');
}

module.exports = connectToMongo;