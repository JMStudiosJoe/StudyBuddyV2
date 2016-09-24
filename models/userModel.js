var db = require('../db/cloudantModel.js');
var User = function ( firstName, lastName, country, state, zipcode, phoneNumber, accountSid ) {  
    
    var data = {
        "firstName": firstName,
        "lastName": lastName,
        "country": country,
        "state": state,
        "zipcode": zipcode,
        "phoneNumber": phoneNumber,
        "accountSid": accountSid
    }
    this.data = data;
};


//User.prototype.data = {}
//User.prototype.getUserDetails = function() {
//    retrun User.prototype.data;
//};

//User.prototype.changeName = function (firstName, lastName, country, state, zipcode, ) {  
//    this.data.firstName = name;
//}
User.getDetails = function () {
    return this.data;
};

User.findById = function (id, callback) {  
    db.get('users', {id: id}).run(function (err, data) {
        if (err) return callback(err);
        callback(null, new User(data));
    });
};

module.exports = User;
