"use strict";
var cl = require("cloudant");
var VCAP = require("./StudyBuddy_VCAP_Services");
let cloudantUsername = VCAP["cloudantNoSQLDB"][0]["credentials"]["username"];
let cloudantPassword = VCAP["cloudantNoSQLDB"][0]["credentials"]["password"];
class Cloudant {
    constructor() {
        console.log("constructor constructed");
        this.getCloudantDB().then(function (db) {
            console.log(db);
            this.db = db;
            return this;
        }, function (err) {
            console.log(err);
            return this;
        });
    }
    getCloudantDB() {
        let p = new Promise(function (resolve, reject) {
            cl({ "account": cloudantUsername,
                "password": cloudantPassword }, function (err, cloudant) {
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
exports.Cloudant = Cloudant;
module.exports = Cloudant;
