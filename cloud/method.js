/**
 * Created by MeoWoodie on 5/14/15.
 */
var dao_config = require("cloud/dao/dao_config.js");
var dao_model  = require("cloud/dao/dao_model.js");
var util = require("cloud/util.js");

exports.train = function (tag, event_label){
    dao_config.getConfig().then(
        function (config_names, config_values){
            var promise = new AV.Promise();
            var config = util.processConfig(config_names, config_values);
            dao_model.getRecentGMMHMM(tag, event_label).then(
                function (gmmhmm){
                    console.log(gmmhmm);
                }
            );
            return promise;
        },
        function (error){
            console.log(error);
        }
    )
};
