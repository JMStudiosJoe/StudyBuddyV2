var express = require("express");

var router = express.Router();

var User = require('../models/userModel.js');

var Cloudant = require("cloudant");

var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"]; 
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
function cloudantMiddleware(req, res, next) {

    var latestUser = req.locals.newUser;
    //User.findByPhoneNumber( latestUser );
    next();
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

