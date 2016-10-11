var express = require("express");

var router = express.Router();

var User = require('../models/userModel.js');

var Cloudant = require("cloudant");

var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"]; 
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
function cloudantMiddleware(req, res, next) {
    var userModel = new User();
    
    var latestUser = req.locals.newUser;
    userModel.findByPhoneNumber( latestUser.data.phoneNumber ).then(
    function successCallback( searchUser ) {
        console.log("FOUND THE USER!!!!!!!!!!!!!!!!!!");
        console.log( searchUser );
        next();
    },
    function failedCallback( error ) {
        console.log( "THERE WAAS AN ERROR FINDING THE USER" );
        var message = 'Welcome to StudyBuddy please response with  yes   to register';
        res.send('<Response><Message>'+message+'</Message></Response>');
    });
};

router.get('/', cloudantMiddleware, function(req, res, next) {
    next();
});

router.post('/sendMessageBodyToWatson', cloudantMiddleware, function(req, res, next) {
    next();
});
module.exports = {
    cloudantHandler: router
}

