import * as Twilio from "./TwilioModule";
import * as Cloudant from "./CloudantModule";
export class BluemixServiceModule {

  constructor() {
    //var tw = new Twilio();

    var cl = new Cloudant();
    cl.getCloudantDB().then(function (db) {
      console.log("got the db now yo");
      console.log(db);
    }, function(err) {
      console.log(err);
    });
    







  };
}
var b = new BluemixServiceModule();
