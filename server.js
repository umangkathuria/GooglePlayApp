/**
 * Require
 */
const express = require('express');
require('dotenv').config();
const logger = require('umang_logger_module');
const handler = require('./src/services/request-handler');
const contants = require('./constants');


// Express initialisation
const app = express();

// Setting headers to ensure that CORS is validated.
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Route for /getAllApps
app.get(contants.PATH_GET_ALL_APPS, handler.getAllAppHandler);

// Route for /getAppById
app.get(contants.PATH_GET_APP_BY_ID, handler.getAppById);

// Route to update data
app.get(contants.PATH_UPDATE_DATA, handler.updateData);

app.listen(process.env.PORT, function() {
    logger.info("Server intialised.")
});