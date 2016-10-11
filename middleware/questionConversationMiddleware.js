var express = require("express");

var router = express.Router();

var Promise = require( 'bluebird' );
var User = require('../models/userModel.js');
var Conversation = Promise.promisifyAll(require('../models/questionModel.js'));
var conversation = new Conversation();

function questionConversationMiddleware(req, res, next) {
    var question = req.locals.userQuestion;
    
    var answer = conversation.askQuestion( question ).then( 
    function successCallback( data ) {
        res.send('<Response><Message>'+data+'</Message></Response>');
        return Promise.resolve(data);        
    }
    , function failedCallback( error ) {
        console.log(error);
        return Promise.reject(error);
    });
};

router.post('/sendMessageBodyToWatson', questionConversationMiddleware, function(req, res, next) {
    next();
});

module.exports = {
    questionConversationHandler: router
}

