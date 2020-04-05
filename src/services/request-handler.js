/** */
const gplayService = require('./gplay-service');

function getAllAppHandler(request, response){
    console.log("Hello! You will soon ge all the apps at this endpoint");
    gplayService.getAllTopSellingFreeApps()
    .then((result)=>{
      console.log("All apps fetched successfully.. sending repsonse!")
      response.send({
        status: "OK",
        code: 200,
        message: "Success",
        payload: result
      })
    })
    .catch((err)=>{
      console.log("Error Occured--> ", err);
      response.send({
        status: 500,
        message: "Internal Server error.",
        errDescription: "Could not fetch data from the API. Check the error object for more details.",
        error: err
      })
    })
}

function getAppById(request, response){
    console.log("Received GET request at /getAppById");
    gplayService.getAppById(request.query.appId)
    .then((result) => {
      response.send({
        status: "OK",
        code: 200,
        message: "Success",
        payload: result
      })
    })
    .catch((err)=>{
      response.send({
        status: 500,
        message: "Internal Server error.",
        errDescription: "Could not fetch data from the API. Check the error object for more details.",
        error: err
      })
    })
}

module.exports.getAllAppHandler = getAllAppHandler;
module.exports.getAppById = getAppById