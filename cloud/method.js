/**
 * Created by MeoWoodie on 5/14/15.
 */
var dao_config = require("cloud/dao/dao_config.js");
var algo       = require("cloud/algo/model.js");

exports.trainWithSpecificObs = function (algo_type, tag, event_label, obs, description){
    var Model = new algo.Model(algo_type, tag, event_label);
    return Model.configuration().then(
        function (){
            if (obs != undefined) {
                return Model.train(obs, 10);
            }
            else{
                var failed = new AV.Promise();
                failed.reject("Obs is undefined.");
                return failed;
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
                var success = new AV.Promise();
                success.resolve(model);
                return success;
            }
        },
        function (error){
            var failed = new AV.Promise();
            failed.reject(error);
            return failed;
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
                var success = new AV.Promise();
                success.resolve(model);
                return success;
            }
        },
        function (error){
            var failed = new AV.Promise();
            failed.reject(error);
            return failed;
        }
    );
};

exports.classifySingleSeq = function (algo_type, tag, seq){
    var promise = new AV.Promise();
    dao_config.getConfig().then(
        function (config){
            var event_labels = config["events_type"];
            var Classifier = new algo.Classifier(algo_type, tag, event_labels);
            return Classifier.configuration().then(
                function (){
                    return Classifier.classify(seq);
                },
                function (error){
                    promise.reject(error);
                }
            );
        }
    ).then(
        function (result){
            //console.log(result);
            promise.resolve(result);
        },
        function (error){
            console.log(error);
            promise.reject(error);
        }
    );
    return promise;
};


