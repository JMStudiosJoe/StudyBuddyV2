"use strict";
const Cloudant = require("./CloudantModule");
class BluemixServiceModule {
    constructor() {
        var cl = new Cloudant();
        cl.getCloudantDB().then(function (db) {
            console.log("got the db now yo");
            console.log(db);
        }, function (err) {
            console.log(err);
        });
    }
    ;
}
exports.BluemixServiceModule = BluemixServiceModule;
var b = new BluemixServiceModule();
