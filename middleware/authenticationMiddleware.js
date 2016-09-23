var express = require("express");

var router = express.Router();

var User = require('../models/userModel.js');




function cloudantMiddleware(req, res, next) {

    next();
};

router.get('/', cloudantMiddleware, function(req, res) {

    res.send("gotten past the twilio module and now the cloudant module");
});

module.exports = {
    cloudantHandler: router
}

