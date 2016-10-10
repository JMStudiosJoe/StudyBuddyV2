var express = require("express");

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
    var question = req.body.Body;
    //console.log(latestUser.getDetails());
    req.locals = {
        newUser: {},
        userQuestion: question
    };
    req.locals.newUser = latestUser;
    req.locals.userQuestion = question;
    next();
};

router.post('/sendMessageBodyToWatson', twilioMiddleware, function(req, res, next) {
    //console.log("------------LOCALS OBJECT---------------->>>>>> all in the details");
    //console.log(req.locals.newUser);
    //res.send('<Response><Message>I am sorry, there was an error, please try again./</Message></Response>');
    next();
});

module.exports = {
    twilioHandler: router
}


