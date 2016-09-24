var express = require("express");

var router = express.Router();
console.log("authentication Middleware connecting to user");
var User = require('../models/userModel.js');

var Cloudant = require("cloudant");

var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"]; 
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];

var cloudant = Cloudant({account:username, password:password}, function(err, cloudant) 
{

    if (err) 
    {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    else
    {
        //getDataBases();
        //setDataIntoQuestions()
        return console.log("connected to cloudant");
    }
});

console.log(User);
function cloudantMiddleware(req, res, next) {
    console.log("in the cloudant middleware");
    next();
};

router.get('/', cloudantMiddleware, function(req, res, next) {
    console.log("gotten past the twilio module and now the cloudant module");
    next();
});

module.exports = {
    cloudantHandler: router
}

