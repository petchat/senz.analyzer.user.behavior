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
            }
        },
        function (error){
            console.log(error);
        }
    ).then(
        function (){
            if (description != undefined){
                return Model.updateModel(description);
            }
        },
        function (error){
            console.log(error);
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
            console.log(error);
        }
    ).then(
        function (){
            if (description != undefined){
                return Model.updateModel(description);
            }
        },
        function (error){
            console.log(error);
        }
    );
};

exports.classifySingleSeq = function (algo_type, tag, seq){
    dao_config.getConfig().then(
        function (config){
            var event_labels = config["events_type"];
            var Classifier = new algo.Classifier(algo_type, tag, event_labels);
            Classifier.configuration().then(
                function (){
                    return Classifier.classify(seq);
                },
                function (error){

                }
            );
        }
    ).then(
        function (result){
            console.log(result);
        },
        function (error){
            console.log(error);
        }
    );

};


