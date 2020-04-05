/**
 * Require
 */
const gplayService = require('./gplay-service');
const dbClient = require('../db/db-client');
const logger = require('umang_logger_module');

/**
 * Use this method to handle the GET requests at /getAllApps. 
 * 
 * @param {Object} request Request object
 * @param {Object} response Reesponse object of server.
 */
function getAllAppHandler(request, response){
    dbClient.getDbObject()
    .then((db)=>{
      db.collection('android-apps').find().toArray(function(err, results) {
        if(err) {
          logger.error("Error Occured--> ", err);
        response.send({
          status: 500,
          message: "Internal Server error.",
          errDescription: "Could not fetch data from the API. Check the error object for more details.",
          error: err
        })
        }
        logger.info("All apps fetched successfully.. sending repsonse!")
        if(results.length == 0){
          this.updateData(request, response);
        }
        response.send({
          status: "OK",
          code: 200,
          message: "Success",
          payload: results
        })
      })

    })
    .catch((err)=>{
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
function getAppById(request, response){
  logger.info("Received GET request at /getAppById");
    gplayService.getAppById(request.query.appId)
    .then((result) => {
      logger.info("Application list fetched successfully. Preparing response.")
      response.send({
        status: "OK",
        code: 200,
        message: "Success",
        payload: result
      })
    })
    .catch((err)=>{
      logger.error(`Unexpecter error occured. Could not fetch data from the API due to - ${err}`);
      response.send({
        status: 500,
        message: "Internal Server error.",
        errDescription: "Could not fetch data from the API. Check the error object for more details.",
        error: err
      })
    })
}

/**
 * Use this method to handle the GET requests at /updateData. 
 * 
 * @param {Object} request Request object
 * @param {Object} response Reesponse object of server.
 */
function updateData(request, response){
  logger.info("Received GET request at /updateData");

  dbClient.getDbObject()
  .then((db)=>{

      gplayService.getAllTopSellingFreeApps()
      .then((result)=>{
        logger.info("All apps fetched successfully.. updating database..");
        return updateAndAdd(db, result)
      })
      .then((_)=>{
        logger.info("DataBase Updated Successfully.");
        response.send({
          status: "OK",
          code: 200
        })
      })
      .catch((err)=>{
        logger.error("Error Occured--> ", err);
        response.send({
          status: "Could not load new data.",
          code: 503,
          err
        })
      })
     
  }).catch((err)=>{
    logger.info("Error Occured--> ", err);
      response.send({
        status: "Could not connect with DB",
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
function updateAndAdd(db, results){
  return new Promise((resolve, reject)=>{

    results.forEach(element => {
    db.collection('android-apps')
    .findOneAndUpdate({appId: element.appId }, {
      $set: {
        title: element.title,
        url: element.url,
        icon: element.icon,
        developer: element.developer,
        developerId: element.developerId,
        summary: element.summary,
        scoreText: element.scoreText,
        score: element.score,
        priceText:element.priceText,
        currency:element.currency,
        price:element.price,
        free:element.free
    }
  }, {
    upsert: true
  }, (err, _) => {
    if (err) {
      reject(err)
    }else{
      resolve()
    }
  })
  });
  })
  
}

