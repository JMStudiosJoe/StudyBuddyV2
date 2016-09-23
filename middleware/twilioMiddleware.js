var express = require("express");

var router = express.Router();

function twilioMiddleware(req, res, next) {

    next();
};

router.get('/', twilioMiddleware, function(req, res, next) {
    console.log("into the get request for router in twilio handler");
    next();
});

module.exports = {
    twilioHandler: router
}


