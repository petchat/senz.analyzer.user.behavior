/**
 * Created by MeoWoodie on 5/14/15.
 */
var dao_config = require("cloud/dao/dao_config.js");
var algo       = require("cloud/algo/model.js");
var config     = require("cloud/config.js");

exports.trainWithSpecificObs = function (algo_type, tag, event_label, obs, description){
    var Model = new algo.Model(algo_type, tag, event_label);
    return Model.configuration().then(
        function (){
            if (obs != undefined) {
                return Model.train(obs, 10);
            }
            else{
                return AV.Promise.error("Obs is undefined.");
            }
        },
        function (error){
            var failed = new AV.Promise();
            failed.reject(error);
            return failed;
        }
    ).then(
        function (model){
            if (description != undefined){
                return Model.updateModel(description);
            }
            else{
                return AV.Promise.as(model);
            }
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};

exports.trainWithRandomObs = function (algo_type, tag, event_label, obs_length, obs_count, description){
    var Model = new algo.Model(algo_type, tag, event_label);
    return Model.configuration().then(
        function (){
            return dao_config.getConfig().then(
                function (config){
                    var event_prob_map = config["event_prob_map"];
                    return Model.trainRandomly(obs_length, obs_count, event_prob_map, 10);
                }
            );
        },
        function (error){
            return AV.Promise.error(error);
        }
    ).then(
        function (model){
            if (description != undefined){
                return Model.updateModel(description);
            }
            else{
                return AV.Promise.as(model);
            }
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};

exports.classifySingleSeq = function (algo_type, tag, seq){
    //var promise = new AV.Promise();
    var Classifier;
    return dao_config.getConfig().then(
        function (config){
            var event_labels = config["events_type"];
            Classifier = new algo.Classifier(algo_type, tag, event_labels);
            return Classifier.configuration();
        }
    ).then(
        function (){
            return Classifier.classify(seq);
        },
        function (error){
            return AV.Promise.error(error);
        }
    );
};

exports.initModelParams = function (algo_type, tag, event_label){
    var promise = new AV.Promise();
    var Model = new algo.Model(algo_type, tag, event_label);
    var init_params = config.InitParams[algo_type][event_label];
    Model.initModel(tag, event_label, init_params["nComponent"], init_params["hmmParams"], init_params["gmmParams"]).then(
        function (model_id){
            promise.resolve(model_id);
        },
        function (error){
            promise.reject(error);
        }
    );
    return promise;
};


