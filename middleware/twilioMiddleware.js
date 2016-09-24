var express = require("express");
console.log("trying to load");
var router = express.Router();
var VCAP = require("../BluemixServices/StudyBuddy_VCAP_Services.json");
var accountSid = VCAP["twilio"][0]["credentials"]["username"];
var authToken = VCAP["twilio"][0]["credentials"]["password"];
var twilioClient = require('twilio')(accountSid, authToken);
var twilioLookupClient = require('twilio').LookupsClient;
var lookups = new twilioLookupClient(accountSid, authToken);


function twilioMiddleware(req, res, next) {
	console.log("-----------------------------");
	console.log(lookups);
    console.log("in the wilio middlewares");
    next();
};

router.get('/', twilioMiddleware, function(req, res, next) {
    console.log("into the get request for router in twilio handler");
    next();
});

module.exports = {
    twilioHandler: router
}


