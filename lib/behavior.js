/**
 * Created by MeoWoodie on 5/14/15.
 */
var AV         = require('leanengine');
var dao_config = require("./dao/dao_config.js");
var m          = require("./algo/model.js");
var c          = require("./algo/classifier.js");
var config     = require("./config.js");
var logger     = require("./logger.js");

exports.trainWithSpecificObs = function (algo_type, tag, event_label, obs, description){
    var Model = new m.Model(algo_type, tag, event_label);
    return Model.configuration().then(
        function (){
            if (obs != undefined) {
                //logger.info(config.logEventType.u2e, "Observation is correct. Start to train.");
                return Model.train(obs, 10);
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

exports.trainWithRandomObs = function (algo_type, tag, event_label, obs_length, obs_count, description){
    var Model = new m.Model(algo_type, tag, event_label);
    return Model.configuration().then(
        function (){
            //logger.info(config.logEventType.ret, "Retrieving config from database.");
            return dao_config.getConfig();
        },
        function (error){
            //logger.error(config.logEventType.ret, "Retrieving config failed.");
            return AV.Promise.error(error);
        }
    ).then(
        function (config){
            //logger.info(config.logEventType.ret, "Retrieved config from database.");
            var event_prob_map = config["event_prob_map"];
            //logger.info(config.logEventType.u2e, "Generate random observations according to event prob map. Start to train.");
            return Model.trainRandomly(obs_length, obs_count, event_prob_map, 10);
        },
        function (error){
            //logger.error(config.logEventType.ret, "Retrieving config from senz.config failed.");
            return AV.Promise.error(error);
        }
    ).then(
        function (model){
            if (description != undefined){
                logger.info(config.logEventType.upd, "Training is over. Updating model to database.");
                return Model.updateModel(description);
            }
            else{
                return AV.Promise.as(model);
            }
        },
        function (error){
            //logger.info(config.logEventType.upd, "Training is over. But updating model failed.");
            return AV.Promise.error(error);
        }
    );
};

exports.classifySingleSeq = function (algo_type, tag, seq){
    //var promise = new AV.Promise();
    var Classifier;
    return dao_config.getConfig().then(
        function (config){
            //logger.info(config.logEventType.ret, "Retrieving config from senz.config.");
            var event_labels = config["events_type"];
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

exports.initModelParams = function (algo_type, tag, event_label){
    //var promise = new AV.Promise();
    var Model = new m.Model(algo_type, tag, event_label);
    //var init_params = config.InitParams[algo_type][event_label];
    var init_model = config.BehaviorInitParams[algo_type][event_label];
    return Model.initModel(tag, event_label, init_model);
    //return promise;
};


