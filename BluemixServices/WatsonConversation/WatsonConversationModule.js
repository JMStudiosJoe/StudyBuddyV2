//https://github.com/watson-developer-cloud/conversation-simple/blob/master/app.js
'use strict';

var VCAP = require("../StudyBuddy_VCAP_Services.json");
console.log(VCAP);
var express = require( 'express' );  // app server
var bodyParser = require( 'body-parser' );  // parser for post requests
var watson = require( 'watson-developer-cloud' );
var username = VCAP["conversation"][0]["credentials"]["username"];
var password = VCAP["conversation"][0]["credentials"]["password"];
var conversation = watson.conversation( {
  url: 'https://gateway.watsonplatform.net/conversation/api',
  username: username,
  password: password,
  version_date: '2016-07-11',
  version: 'v1'
} );


var payload = {
    workspace_id: 'ae0475ab-4564-4657-9aa5-d783ccedc9e0',
    context: {},
    input: {}
};
conversation.message( payload, function(err, data) {
    if ( err ) {
		console.log(err);
    }
	console.log(data);
  } );
console.log(conversation);
