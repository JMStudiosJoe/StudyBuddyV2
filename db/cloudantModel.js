
var Cloudant = require("cloudant");
//var Cloudant = require('../BluemixServices/CloudantModule.js');
var VCAP = require('../BluemixServices/StudyBuddy_VCAP_Services.json');
var username = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"];
var password = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
var db = {};
var _cloudant = Cloudant({account:username, password:password}, function(err, cloudant)
{

    this.data = {};
    if (err)
    {
        return console.log('Failed to initialize Cloudant: ' + err.message);
    }
    else
    {
        db = cloudant.db;
        this.data.db = cloudant.db;
        return this;
    }
});

module.exports = _cloudant;
