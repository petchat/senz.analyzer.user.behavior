/**
 * Created by MeoWoodie on 5/14/15.
 */
var util = require("cloud/util.js");

exports.getConfig = function (){
    var promise = new AV.Promise();
    var Config = AV.Object.extend("config");
    var query = new AV.Query(Config);
    //query.equalTo("eventLabel", event_label);
    //query.descending("timestamp");
    //query.limit(1);
    query.find().then(
        function (results){
            console.log("Successfully retrieved " + results.length + " configs.");
            if (results.length == 0){
                promise.resolve(undefined);
            }
            else {
                var config_names = [];
                var config_values = [];
                results.forEach(function (result) {
                    var name = result.get("name");
                    var value = result.get("value");
                    config_names.push(name);
                    config_values.push(value);
                });
                var processed_config = util.processConfig(config_names, config_values);
                promise.resolve(processed_config);
            }
        },
        function (error_info){
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};