/**
 * Require
 */
const gplayService = require('./gplay-service');
const dbClient = require('../db/db-client');
const logger = require('umang_logger_module');
const scrapper = require('./scrapper');
const constants = require('../constants.js');
const ErrorHandler = require('../utils/errorHandler');

/**
 * Use this method to handle the GET requests at /getAllApps. 
 * 
 * @param {Object} request Request object
 * @param {Object} response Reesponse object of server.
 */
function getAllAppHandler(request, response) {
    dbClient.getDbObject()
        .then((db) => {
            db.collection(constants.DB).find().toArray(function(err, results) {
                if (err) {
                    logger.error("Error Occured--> ", err);
                    // response.send(new ErrorHandler(500, "Internal Server Error", "Could not fetch data from the API. Check the error object for more details.", err))
                    response.send({
                        status: 500,
                        message: "Internal Server error.",
                        errDescription: "Could not fetch data from the API. Check the error object for more details.",
                        error: err
                    })
                }
                logger.info("All apps fetched successfully.. sending repsonse!")
                if (results.length == 0) {

                    updateData(request, response);
                }
                response.send({
                    status: 200,
                    code: 200,
                    message: "Success",
                    payload: results
                })
            })

        })
        .catch((err) => {
            logger.error("DB Connection failed.")
            reject(err)
        })

}

/**
 * Use this method to handle the GET requests at /getAppById. 
 * 
 * @param {Object} request Request object
 * @param {Object} response Reesponse object of server.
 */
function getAppById(request, response) {
    logger.info("Received GET request at /getAppById");
    // gplayService.getAppById(request.query.appId)

    dbClient.getDbObject()
        .then((db) => {
            db.collection('new-android-apps').find({ appId: request.query.appId })
                .toArray(function(err, result) {
                    if (err) {
                        logger.error("Error Occured--> ", err);
                        response.send({
                            status: 500,
                            message: "Internal Server error.",
                            errDescription: "Could not fetch data from the API. Check the error object for more details.",
                            error: err
                        })
                    }
                    if (result.length == 0) {
                        logger.info("Application could not be found in the database.")
                        response.send({
                            status: 500,
                            errDescription: "Data not found. Please check the appId"
                        })
                    } else {
                        logger.info("Application list fetched successfully. Preparing response.")
                        response.send({
                            status: 200,
                            message: "Success",
                            payload: result[0]
                        })
                    }
                })

        })
        .catch((err) => {
            logger.error("DB Connection failed.")
            reject(err)
        })
}

/**
 * Use this method to handle the GET requests at /updateData. 
 * 
 * @param {Object} request Request object
 * @param {Object} response Reesponse object of server.
 */
function updateData(request, response) {
    logger.info("Received GET request at /updateData");

    dbClient.getDbObject()
        .then((db) => {
            // gplayService.getAllTopSellingFreeApps()
            scrapper.crawl()
                .then((result) => {
                    logger.info("All apps fetched successfully.. updating database..");
                    return updateAndAdd(db, result)
                })
                .then((_) => {
                    logger.info("DataBase Updated Successfully.");
                    response.send({
                        status: 200,
                        code: 200
                    })
                })
                .catch((err) => {
                    logger.error("Error Occured--> ", err);
                    response.send({
                        status: 503,
                        message: "Couldn't load data",
                        code: 503,
                        err
                    })
                })

        }).catch((err) => {
            logger.info("Error Occured--> ", err);
            response.send({
                message: "Could not connect with DB",
                status: 503,
                code: 503,
                err
            })
        })

}

module.exports.getAllAppHandler = getAllAppHandler;
module.exports.getAppById = getAppById;
module.exports.updateData = updateData


/**
 * Use this method to add new items to DB or to update the 
 * existing ones with new values based on the the appId. 
 * 
 * @param {Object} db Contains the DB object.
 * @param {Array} results Contains the array of objects that needs to be 
 * updated/added in the DB. 
 */
function updateAndAdd(db, results) {
    return new Promise((resolve, reject) => {

        results.forEach(element => {
            db.collection('new-android-apps')
                .findOneAndUpdate({ appId: element.appId }, {
                    $set: {
                        title: element.title,
                        url: element.url,
                        icon: element.icon,
                        developer: element.developer,
                        developerId: element.developerId,
                        summary: element.summary,
                        scoreText: element.scoreText,
                        score: element.score,
                        priceText: element.priceText,
                        currency: element.currency,
                        price: element.price,
                        free: element.free,
                        description: element.description,
                        screenshots: element.screenshots
                    }
                }, {
                    upsert: true
                }, (err, _) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                })
        });
    })

}

function crawlAndPush(request, response) {
    return new Promise((resolve, reject) => {
        scrapper.crawl()
            .then((result) => {
                response.send({
                    code: 200,
                    status: 200,
                    message: "Success",
                    payload: result
                })
            })
    })
}

module.exports.crawlAndPush = crawlAndPush;