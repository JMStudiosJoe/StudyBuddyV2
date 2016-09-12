//var {cloudant} = require("../types/cloudant.d.ts");
//console.log(cloudant);
import express = require("express");
var cl = require("cloudant");
var VCAP = require("./StudyBuddy_VCAP_Services");

let cloudantUsername = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"];
let cloudantPassword = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];

interface Database {

}
export class Cloudant {
  db: Database;

  constructor(): Promise<any> {

    console.log("constructor constructed");
    this.getCloudantDB().then( function(db) {
      console.log(db);
      this.db = db
      return this;
    }, function(err) {
      console.log(err);
      return this;
    });


  }
  getCloudantDB(): Promise<any> {

    let p = new Promise<string>(function (resolve, reject) {
      cl({"account": cloudantUsername,
         "password": cloudantPassword}, function(err, cloudant) {

           if (err) {
             console.log(err);
             reject(err);
             return;
           }
           else {
             resolve(cloudant["db"]);
           }
         });
    });
    return p;

  }
}
module.exports = Cloudant;
