var express = require("express");

var router = express.Router();

var User = require('../models/userModel.js');
var Conversation = require('../models/questionModel.js');
var conversation = new Conversation();
//var Cloudant = require("cloudant");

//var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
//var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"]; 
//var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
function questionConversationMiddleware(req, res, next) {+
    console.log("------------ question conversation Module--------------");
    console.log(req.locals.newUser.data);
    console.log("-----------------converstation ---------------");
    console.log(conversation);
    var question = req.locals.userQuestion;
    var answer = conversation.askQuestion( question, res );
};

router.post('/sendMessageBodyToWatson', questionConversationMiddleware, function(req, res, next) {
    console.log("gotten past the twilio module and now the cloudant module");
    next();
});

module.exports = {
    questionConversationHandler: router
}

