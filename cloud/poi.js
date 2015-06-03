/**
 * Created by MeoWoodie on 6/2/15.
 */
var dao_config = require("cloud/dao/dao_config.js");
var m          = require("cloud/algo/model.js");
var c          = require("cloud/algo/poi_classifier.js");
var config     = require("cloud/config.js");
var logger     = require("cloud/logger.js");

//exports.trainWithPois = function (algo_type, tag){
//    var Model = new m.Model(algo_type, tag, "poi");
//    return Model.configuration().then(
//        function (){
//            if (obs != undefined) {
//                //logger.info(config.logEventType.u2e, "Observation is correct. Start to train.");
//                return Model.train(obs, 10);
//            }
//            else{
//                //logger.error(config.logEventType.u2e, "Observation is incorrect. Failed to train.");
//                return AV.Promise.error("Obs is undefined.");
//            }
//        },
//        function (error){
//            //logger.error(config.logEventType.u2e, "Configuration is incorrect. Failed to train.");
//            return AV.Promise.error(error);
//        }
//    ).then(
//        function (model){
//            if (description != undefined){
//                //logger.info(config.logEventType.upd, "Training is over. Updating model to database.");
//                return Model.updateModel(description);
//            }
//            else{
//                return AV.Promise.as(model);
//            }
//        },
//        function (error){
//            //logger.error(config.logEventType.u2e, "Training is over. But updating model failed.");
//            return AV.Promise.error(error);
//        }
//    );
//};

var poi_list = [
    {
        "poiType": "restaurant",
        "distence": 14.5
    },
    {
        "poiType": "gym",
        "distence": 24.1
    }
];

var data = {
    "pois": poi_list,
    "timetamp": 12142543534634
};

exports.predictPoi = function (algo_type, tag, poi_list){
    //var promise = new AV.Promise();
    var Classifier;
    Classifier = new c.PoiClassifier(algo_type, tag);
    return Classifier.configuration().then(
        function (){
            //logger.info(config.logEventType.ret, "Retrieving config from database.");
            //logger.info(config.logEventType.u2e, "Predict the behavior's event with the sequence.");
            return Classifier.classify(poi_list);
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};

exports.initModelParams = function (algo_type, tag){
    var Model = new m.Model(algo_type, tag, "poi");
    //var init_params = config.InitParams[algo_type][event_label];
    return dao_config.getConfig().then(
        function (configs){
            var poi_type_list = configs[configs["log_type"]["location"]];
            var init_model = config.PoisInitParams[algo_type];
            // TODO: HOW???
            init_model.nMix = poi_type_list.length;
            init_model.params["nMix"] = poi_type_list.length;
            return Model.initModel(tag, "poi", init_model);
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};
