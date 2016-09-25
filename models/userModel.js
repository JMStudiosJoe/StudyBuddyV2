var db = require('../db/cloudantModel.js');
var User = function ( firstName, lastName, country, state, zipcode, phoneNumber, accountSid ) {  
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
    }
    this.data = data;
    return this;
};


User.prototype.getDetails = function () {
    console.log("Getting user data");
    console.log(this.data);
    console.log(User.data);
    return this.data;
};

User.prototype.findById = function (id, callback) {  
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));// first parameter is for error the other is for data so callback function( error, data){ do business logic in here but this is in OTHER FILE}
    });
};

module.exports = User;
