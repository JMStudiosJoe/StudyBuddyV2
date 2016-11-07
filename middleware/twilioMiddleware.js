var express = require("express");

var router = express.Router();
var VCAP = require("../BluemixServices/StudyBuddy_VCAP_Services.json");
var accountSid = VCAP["twilio"][0]["credentials"]["username"];
var authToken = VCAP["twilio"][0]["credentials"]["password"];
var twilioClient = require('twilio')(accountSid, authToken);
var twilioLookupClient = require('twilio').LookupsClient;
var lookups = new twilioLookupClient(accountSid, authToken);
var User = require("../models/userModel.js");

router.post('/sendMessageBodyToWatson', function(req, res, next) {
  var latestUser = new User("ji joe", "joe joe", req.body.FromCountry, req.body.FromState, req.body.FromZip, req.body.From, req.body.AccountSid)
  var question = req.body.Body;
  req.locals = {
      newUser: {},
      userQuestion: question
  };
  req.locals.newUser = latestUser;
  req.locals.userQuestion = question;
  next();
});

module.exports = {
    twilioHandler: router
}
