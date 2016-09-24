var express = require("express");
console.log("trying to load");
var router = express.Router();

function twilioMiddleware(req, res, next) {
    console.log("in the wilio middlewares");
    next();
};

router.get('/', twilioMiddleware, function(req, res, next) {
    console.log("into the get request for router in twilio handler");
    next();
});

module.exports = {
    twilioHandler: router
}


