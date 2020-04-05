/**
 * Require
 */
const express = require('express');
require('dotenv').config();
const handler = require('./src/services/request-handler');
const contants =  require('./constants');

// Express initialisation
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.get("/home", (req, res)=>{
    res.sendFile('C:/GooglePlayApp/GooglePlayApp/src/ui/landing-page.html');
    // res.send('./src/ui/js/landing-page.html');
  })
app.get(contants.PATH_GET_ALL_APPS, handler.getAllAppHandler);

app.get(contants.PATH_GET_APP_BY_ID, handler.getAppById);

app.listen(process.env.PORT, function() {
    console.log('listening on 3000')
});