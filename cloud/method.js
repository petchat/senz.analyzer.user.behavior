/**
 * Created by MeoWoodie on 5/14/15.
 */
var dao_config = require("cloud/dao/dao_config.js");
var dao_model  = require("cloud/dao/dao_model.js");
var util = require("cloud/util.js");
var algo = require("cloud/algo.js");

//exports.train = function (model_type, tag, event_label, description, n_iter, obs, obs_length, obs_count){
//    // Get config from senz.config
//    var model_config = {};
//    dao_config.getConfig().then(
//        function (config_names, config_values){
//            var config = util.processConfig(config_names, config_values);
//            // Get gmmhmm from senz.config.model.config
//            return dao_model.getRecentGMMHMM(tag, event_label).then(
//                function (gmmhmm){
//                    //console.log(JSON.stringify(gmmhmm, null, 4));
//                    model_config = gmmhmm["config"];
//                    var model = gmmhmm["model"];
//                    // Add n iter.
//                    model["nIter"] = n_iter;
//                    if (util.checkModelConfig(model_config, config)){
//                        if (obs != undefined){
//                            if (model_type == "GMMHMM") {
//                                return algo.trainGMMHMM(obs, model, model_config);
//                            }
//                            // Puts other model here.
//                        }
//                        else{
//                            var event_prob_map = config["event_prob_map"];
//                            console.log(event_prob_map);
//                            return algo.trainGMMHMMrandomly(
//                                event_label, obs_length, obs_count, model, model_config, event_prob_map
//                            );
//                        }
//                    }
//
//                }
//            );
//        },
//        function (error){
//            console.log(error);
//        }
//    ).then(
//        function (new_model_params){
//            dao_model.updateGMMHMM(
//                tag,
//                new_model_params["gmmParams"], new_model_params["hmmParams"],
//                event_label,
//                new_model_params["nComponent"], new_model_params["nMix"], new_model_params["covarianceType"],
//                description,
//                model_config
//            )
//        },
//        function (error){
//            console.log(error);
//        }
//    )
//};

exports.train = function (model_type, tag, event_label, description, n_iter, obs, obs_length, obs_count){
    // Get config from senz.config
    var model_config = {};
    var promises = [];
    promises.push(dao_config.getConfig());
    if (model_type == "GMMHMM") {
        promises.push(dao_model.getRecentGMMHMM(tag, event_label));
    }
    AV.Promise.when(promises).then(
        function (config_names, config_values, model){
            console.log(config_names);
            console.log(config_values);
            var config = util.processConfig(config_names, config_values);
            var model_config = model["config"];
            var model_param  = model["model"];
            model_param["nIter"] = n_iter;
            // Initiation of Model.
            var model = algo.Model(model_type, model_param, model_config);
            if (util.checkModelConfig(model_config, config)) {
                if (obs != undefined) {
                    //if (model_type == "GMMHMM") {
                    //    return algo.trainGMMHMM(obs, model, model_config);
                    //}
                    // Puts other model here.
                    model.train(obs);

                }
                else {
                    var event_prob_map = config["event_prob_map"];
                    //if (model_type == "GMMHMM") {
                    //    return algo.trainGMMHMMrandomly(
                    //        event_label, obs_length, obs_count, model, model_config, event_prob_map
                    //    );
                    //}
                    // Puts other model here.
                    model.trainRandomly(event_label, obs_length, obs_count, event_prob_map);
                }
            }
        },
        function (error){
            console.log(error);
        }
    ).then(
        function (new_model_params){
            //dao_model.updateGMMHMM(
            //    tag,
            //    new_model_params["gmmParams"], new_model_params["hmmParams"],
            //    event_label,
            //    new_model_params["nComponent"], new_model_params["nMix"], new_model_params["covarianceType"],
            //    description,
            //    model_config
            //)
        },
        function (error){
            console.log(error);
        }
    );
};

exports.classify = function (model_type, seq, tag){
    var config = {};
    dao_config.getConfig().then(
        function (config_names, config_values){
            config = util.processConfig(config_names, config_values);
            var promises = [];
            var events_type = config["events_type"];
            events_type.forEach(function (event_type){
                promises.push(dao_model.getRecentGMMHMM(tag, event_type));
            });
            return AV.Promise.all(promises)
        },
        function (error){
            console.log(error);
        }
    ).then(
        function (models){
            var valid_models = [];
            models.forEach(function (m){
                if (m != undefined && util.checkModelConfig(m["config"], config)) {
                    valid_models.push(m["model"]);
                }
            });
            if (model_type == "GMMHMM") {
                return algo.classifyGMMHMM(seq, valid_models);
            }
        },
        function (error){
            console.log(error);
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
