var db = require( '../db/cloudantModel.js' );
var Promise = require( 'bluebird' );
var phoneNumberSelectorForSearch = {
	selector: {
		 phoneNumber: ""
	}
 };
User = function ( firstName, lastName, country, state, zipcode, phoneNumber, accountSid ) {

    //other possible data
    // "conversationIDHistory": [numbers],
    //
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "country": country,
        "state": state,
        "zipcode": zipcode,
        "phoneNumber": phoneNumber,
        "accountSid": accountSid,
        "clientID": 0,
        "conversationID": 0
    };
    this.data = data;
    return this;
};


User.prototype.getDetails = function () {
    return this.data;
};

User.prototype.findByPhoneNumber = function( phoneNumber ) {
    var usersdb = db.use( 'users' );
    var phoneNumberSelectorForSearch = {
			selector: {
				phoneNumber: phoneNumber
			}
    };
    var findUserPromise = new Promise( function ( resolve, reject ) {
    usersdb.find(phoneNumberSelectorForSearch, function(er, result) {
		    if(result.docs.length == 0 || typeof result == 'undefined' || er) {
				    console.log(er);
				    reject(er);
	    // this goes in the promise then() not here	  		res.send('<Response><Message>Welcome to StudyBuddy, send yes to register FOR FREE. /</Message></Response>');
		    }
		    else {
			    resolve(result);
		    }
	    });
    });
    return findUserPromise;
};

User.prototype.create = function ( newUser ) {

    var createUserPromise = new Promise ( function ( resolve, reject ) {
			var usersdb = db.use( 'users' );
			usersdb.insert( newUser, function ( er, result ) {
			    if ( er  ) {
			        reject( er );
			    }
			    else {
				console.log( "user created successfully : " );
				console.log( result );
				resolve( result );
	    }
		});
  });

    return createUserPromise;
};

module.exports = User;
