/**
 * Created by MeoWoodie on 6/2/15.
 */
var AV         = require('leanengine');
var dao_config = require("./dao/dao_config.js");
var m          = require("./algo/model.js");
var c          = require("./algo/classifier.js");
var config     = require("./config.js");
var logger     = require("./logger.js");

exports.trainWithSpecificPois = function (algo_type, tag, poi_label, obs, description){
    var Model = new m.Model(algo_type, tag, poi_label);
    return Model.configuration().then(
        function (){
            if (obs != undefined) {
                //logger.info(config.logEventType.u2e, "Observation is correct. Start to train.");
                return Model.train(obs, 50);
            }
            else{
                //logger.error(config.logEventType.u2e, "Observation is incorrect. Failed to train.");
                return AV.Promise.error("Obs is undefined.");
            }
        },
        function (error){
            //logger.error(config.logEventType.u2e, "Configuration is incorrect. Failed to train.");
            return AV.Promise.error(error);
        }
    ).then(
        function (model){
            if (description != undefined){
                //logger.info(config.logEventType.upd, "Training is over. Updating model to database.");
                return Model.updateModel(description);
            }
            else{
                return AV.Promise.as(model);
            }
        },
        function (error){
            //logger.error(config.logEventType.u2e, "Training is over. But updating model failed.");
            return AV.Promise.error(error);
        }
    );
};

exports.predictPoi = function (algo_type, tag, seq){
    //var promise = new AV.Promise();
    var Classifier;
    return dao_config.getConfig().then(
        function (config){
            //logger.info(config.logEventType.ret, "Retrieving config from senz.config.");
            var event_labels = config["pois_type"];
            Classifier = new c.Classifier(algo_type, tag, event_labels);
            return Classifier.configuration();
        },
        function (error){
            //logger.error(config.logEventType.ret, "Retrieving config from senz.config failed.");
            return AV.Promise.error(error);
        }
    ).then(
        function (){
            //logger.info(config.logEventType.ret, "Retrieving config from database.");
            //logger.info(config.logEventType.u2e, "Predict the behavior's event with the sequence.");
            return Classifier.classify(seq);
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};

//exports.initModelParams = function (algo_type, tag){
//    var Model = new m.Model(algo_type, tag, "poi");
//    //var init_params = config.InitParams[algo_type][event_label];
//    return dao_config.getConfig().then(
//        function (configs){
//            var poi_type_list = configs[configs["log_type"]["location"]];
//            var init_model = config.PoisInitParams[algo_type];
//            // TODO: HOW???
//            init_model.nMix = poi_type_list.length;
//            init_model.params["nMix"] = poi_type_list.length;
//            return Model.initModel(tag, "poi", init_model);
//        },
//        function (error){
//            return AV.Promise.error(error);
//        }
//    );
//};
