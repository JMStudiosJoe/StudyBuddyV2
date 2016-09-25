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
    var latestUser = new User("ji joe", "joe joe", req.body.FromCountry, req.body.FromState, req.body.FromZip, req.body.From, req.body.AccountSid)
    console.log(latestUser.getDetails());
    req.locals = latestUser;
    res.send('<Response><Message>I am sorry, there was an error, please try again./</Message></Response>');
};

router.post('/sendMessageBodyToWatson', twilioMiddleware, function(req, res) {
    console.log("------------LOCALS OBJECT---------------->>>>>> all in the details");
    console.log(req.locals.getDetails());
    res.send('<Response><Message>I am sorry, there was an error, please try again./</Message></Response>');
});

module.exports = {
    twilioHandler: router
}


