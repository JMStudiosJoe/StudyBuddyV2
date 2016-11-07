var db = require('../db/cloudantModel.js');
var Promise = require('bluebird');
var conversation = Promise.promisifyAll( require('../BluemixServices/WatsonConversation/WatsonConversationModule.js') );
var convo = new conversation();
var Question = function ( questionText, phoneNumber, clientID ) {

    var data = {
        "questionText": questionText,
        "phoneNumber": phoneNumber,
        "clientID": clientID,
        "conversationID": 0,
    };
    this.data = data;
    return this;
};

Question.prototype.saveQuestionData = function( isAnswered ) {
    var self = this;
    var saveQuestionPromise = new Promise( function( resolve, reject ){
        var questionDB = db.use( 'questions' );

        questionDB.insert(self.data , 4646464, function( err, body, header ) {

            if( err ) {

                reject( "Error saving question to db" );
            }
            else {
                console.log( "QUESTION DATA SAVED TO DATABASE" );
                resolve( "question saved to Database" );
            }
        });
    });
    return saveQuestionPromise;
}

Question.prototype.askQuestion = function(question) {
    return convo.askQuestion( question );
}

module.exports = Question;
