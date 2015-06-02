var dao = require("cloud/dao/dao_model.js");
var method = require("cloud/behavior.js");
var algo = require("cloud/algo/behavior_model.js");
var config = require("cloud/config.js");
var _ = require("underscore");

//AV.Cloud.define("updateGMMHMM", function (request, response) {
//    var tag = request.params.tag,
//        gmm_params = request.params.gmmParams,
//        hmm_params = request.params.hmmParams,
//        event_label = request.params.eventLabel,
//        n_component = request.params.nComponent,
//        n_mix = request.params.nMix,
//        covariance_type = request.params.covarianceType,
//        description = request.params.description;
//    config = request.params.config;
//    dao.updateGMMHMM(tag, gmm_params, hmm_params, event_label, n_component, n_mix, covariance_type, description, config).then(
//        function (gmmhmm_id) {
//            response.success({
//                code: 0,
//                hmmId: gmmhmm_id,
//                message: "gmmhmm params update successfully!"
//            });
//        },
//        function (err) {
//            response.error({
//                code: 1,
//                message: err
//            });
//        }
//    );
//});
//
//AV.Cloud.define("getRecentGMMHMM", function (request, response) {
//    var tag = request.params.tag,
//        event_label = request.params.eventLabel;
//    dao.getRecentGMMHMM(tag, event_label).then(
//        function (gmmhmm) {
//            response.success({
//                code: 0,
//                gmmhmm: gmmhmm,
//                message: "Retrieve gmmhmm params successfully!"
//            });
//        },
//        function (err) {
//            response.error({
//                code: 1,
//                message: err
//            });
//        }
//    );
//});

// training & classification

AV.Cloud.define("trainWithRandomObs", function (request, response) {
    var algo_type   = request.params.algoType,
        tag         = request.params.tag,
        event_label = request.params.eventLabel,
        obs_length  = request.params.obsLength,
        obs_count   = request.params.obsCount,
        description = request.params.description;

    var date = new Date();

    method.trainWithRandomObs(algo_type, tag, event_label, obs_length, obs_count, description).then(
        function (model_id){
            console.log(model_id);
            response.success({
                code: 0,
                modelId: model_id,
                message: "Training successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );
});

AV.Cloud.define("trainWithSpecificObs", function (request, response) {
    var algo_type   = request.params.algoType,
        tag         = request.params.tag,
        event_label = request.params.eventLabel,
        obs         = request.params.obs,
        description = request.params.description;

    var date = new Date();

    method.trainWithSpecificObs(algo_type, tag, event_label, obs, description).then(
        function (model_id){
            //console.log(model_id);
            response.success({
                code: 0,
                modelId: model_id,
                message: "Training successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );
});


AV.Cloud.define("classifySingleSeq", function (request, response) {
    var algo_type = request.params.algoType,
        tag       = request.params.tag,
        seq       = request.params.seq;
    var date = new Date();

    method.classifySingleSeq(algo_type, tag, seq).then(
        function (scores){
            response.success({
                code: 0,
                scores: scores,
                message: "Classifying successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );
});

AV.Cloud.define("initModelParams", function (request, response) {
    var algo_type = request.params.algoType,
        tag       = request.params.tag,
        event_label = request.params.eventLabel;
    var date = new Date();

    method.initModelParams(algo_type, tag, event_label).then(
        function (model_id){
            response.success({
                code: 0,
                modelId: model_id,
                message: "Model init successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );
});


AV.Cloud.define("initAllEventsModelParams", function (request, response) {
    var algo_type = request.params.algoType,
        tag       = request.params.tag;
    var date = new Date();

    var promises = [];
    var eventsInfo = config.InitParams[algo_type];
    _.keys(eventsInfo).forEach(function (event_label){
        promises.push(method.initModelParams(algo_type, tag, event_label));
    });
    AV.Promise.all(promises).then(
        function (model_id_list){
            response.success({
                code: 0,
                modelsIdList: model_id_list,
                message: "All Models init successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );
});

AV.Cloud.define("trainWithPois", function (request, response) {
    var algo_type = request.params.algoType,
        tag       = request.params.tag;

});

AV.Cloud.define("classifyPois", function (request, response) {
    var algo_type = request.params.algoType,
        tag       = request.params.tag;

});


