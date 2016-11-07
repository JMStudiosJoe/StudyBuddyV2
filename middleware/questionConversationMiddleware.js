var express = require("express");

var router = express.Router();

var Promise = require( 'bluebird' );
var User = require('../models/userModel.js');
var Conversation = Promise.promisifyAll(require('../models/questionModel.js'));
var conversation = new Conversation();
var Question = require( '../models/questionModel.js' );

router.post('/sendMessageBodyToWatson', function(req, res, next) {
  var question = req.locals.userQuestion;
  var questionData = new Question( question,6, 46  );
  console.log( questionData );
  questionData.saveQuestionData( true );
  var answer = conversation.askQuestion( question ).then(
  function successCallback( data ) {
      res.send('<Response><Message>'+data+'</Message></Response>');
      return Promise.resolve(data);
  }
  , function failedCallback( error ) {
      console.log(error);
      return Promise.reject(error);
  });
});

module.exports = {
    questionConversationHandler: router
}
