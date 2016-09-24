var express = require("express");
var app = express();
var twilioMiddleware = require("./middleware/twilioMiddleware.js");
var cloudantMiddleware = require("./middleware/authenticationMiddleware.js");

app.use(twilioMiddleware.twilioHandler);
app.use(cloudantMiddleware.cloudantHandler);
app.get('/', function(req, res){
        res.sendFile('public/index.html' , { root: __dirname });
});

// create a public static content service
app.use("/public", express.static(__dirname + '/public'));
app.listen(8000, function () {
    console.log("connected to port 8000");
});
