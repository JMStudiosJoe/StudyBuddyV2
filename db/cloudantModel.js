
var Cloudant = require("cloudant");

var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
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
        db = cloudant.db;
        return db;
    }
});

module.exports = db;
