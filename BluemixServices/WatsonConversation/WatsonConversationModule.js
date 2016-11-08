//https://github.com/watson-developer-cloud/conversation-simple/blob/master/app.js
'use strict';

var VCAP = require("../StudyBuddy_VCAP_Services.json");
var express = require( 'express' );  // app server
var bodyParser = require( 'body-parser' );  // parser for post requests
var watson = require( 'watson-developer-cloud' );
var username = VCAP["conversation"][0]["credentials"]["username"];
var password = VCAP["conversation"][0]["credentials"]["password"];
var Promise = require('bluebird');
var conversation = Promise.promisifyAll(watson.conversation( {
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: username,
  password: password,
  version_date: '2016-07-11',
  version: 'v1'
} ));

class Conversation {
    constructor() {
	     console.log("Conversation constructor");
    }
    askQuestion( questionText ){
    	return  new Promise( function (resolve, reject ) {
    	  var payload = {
      	  workspace_id: 'ae0475ab-4564-4657-9aa5-d783ccedc9e0',
      	  context: {},
      	  input: {
      	    "text": questionText
      	  }
	      };
	      conversation.message( payload, function(err, data) {
      	    if ( err ) {
      		        console.log(err);
      		        reject(error);
      	    }

      	    var answer = data.output.text[0];
            console.log( answer );
            resolve(answer);
      	});
      });
    }
}
exports.Conversation = Conversation;
module.exports = Conversation;
