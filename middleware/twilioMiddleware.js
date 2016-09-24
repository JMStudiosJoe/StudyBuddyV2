var express = require("express");
console.log("trying to load");
var router = express.Router();
var VCAP = require("../BluemixServices/StudyBuddy_VCAP_Services.json");
var accountSid = VCAP["twilio"][0]["credentials"]["username"];
var authToken = VCAP["twilio"][0]["credentials"]["password"];
var twilioClient = require('twilio')(accountSid, authToken);
var twilioLookupClient = require('twilio').LookupsClient;
var lookups = new twilioLookupClient(accountSid, authToken);
var User = require("../models/userModel.js");


function twilioMiddleware(req, res, next) {
    console.log(req.body);
    console.log("-----------------------------");
    console.log(User);
    var latestUser = new User("ji joe", "joe joe", req.body.FromCountry, req.body.FromState, req.body.FromZip, req.body.From, req.body.AccountSid)
    console.log("in the wilio middlewares");
    console.log("-----------------------------");
    console.log(latestUser.getDetails());
    next();
};

router.post('/sendMessageBodyToWatson', twilioMiddleware, function(req, res, next) {
    console.log("into the get request for router in twilio handler");

    res.send('<Reponse><Message>I am sorry, there was an error, please try again./</Message></Response>');
    next();
});

module.exports = {
    twilioHandler: router
}


