
var Cloudant = require("cloudant");

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
        console.log("DB Cloudant Module js Called -------- when do we get called in the process --------------- ");
        //getDataBases();
        //setDataIntoQuestions()
        
        db = cloudant.db
		db.list(function(err, allDbs) {
  			console.log('All my databases: %s', allDbs.join(', '))
		});

        return db;
    }
});

module.exports = db;
