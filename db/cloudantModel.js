
var Cloudant = require("cloudant");

var VCAP = require('../StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"];
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
var db = {};
var cloudant = Cloudant({account:username, password:password}, function(err, cloudant)
{

    if (err)
    {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    else
    {
        //getDataBases();
        //setDataIntoQuestions()
        console.log(cloudant);
        db = cloudant.db;
        return console.log("connected to cloudant");
    }
});

module.exports = db;
