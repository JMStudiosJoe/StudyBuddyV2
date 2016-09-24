var express = require("express");

var router = express.Router();

var Cloudant = require("cloudant");

var VCAP = require('../StudyBuddy_VCAP_Services.json');
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

function cloudantMiddleware(req, res, next) {
    console.log("in the cloudant middleware");
    next();
};

router.get('/', cloudantMiddleware, function(req, res) {
    console.log(req);
    res.send("gotten past the twilio module and now the cloudant module");
});

module.exports = {
    cloudantHandler: router
}

