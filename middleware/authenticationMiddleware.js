var express = require("express");

var router = express.Router();
console.log("authentication Middleware connecting to user");
var User = require('../models/userModel.js');

console.log("authentication Middleware connecting to user");

console.log(User);
function cloudantMiddleware(req, res, next) {
    console.log("in the cloudant middleware");
    next();
};

router.get('/', cloudantMiddleware, function(req, res) {
    console.log(req);
    res.send("gotten past the twilio module and now the cloudant module");
});

module.exports = {
    cloudantHandler: router
}

