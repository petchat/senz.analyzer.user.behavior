/**
 * Created by MeoWoodie on 5/29/15.
 */
/**
 * Created by MeoWoodie on 5/27/15.
 */
var config = require("cloud/config.js");
var logentries = require('node-logentries');

var log = logentries.logger({
    token: config.logentries_token
});

exports.info = function (event, msg){
    log.info("[" + event + "]" + " " + msg);
};

exports.debug = function (event, msg){
    log.debug("[" + event + "]" + " " + msg);
};

exports.warn = function (event, msg){
    log.warning("[" + event + "]" + " " + msg);
};

exports.error = function (event, msg){
    log.err("[" + event + "]" + " " + msg);
};