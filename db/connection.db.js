const mongoose = require("mongoose");
const config = require("../config/config.json");
const { mongoURL } = config[0].database;
try {
    mongoose.connect(mongoURL);
} catch (error) {
    console.log('mongoose connection error: ' + error);
}
//Get the default connection
const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.on('connected', () => console.log('MongoDB connected'));
db.on('disconnected', () => console.log('MongoDB disconnected!'));
module.exports = db;