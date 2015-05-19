var dao = require("cloud/dao/dao_model.js");
var method = require("cloud/method.js");
var algo = require("cloud/algo/others.js");

// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
//AV.Cloud.define("updateGMM", function (request, response) {
//    var gmm_params = request.params.gmmParams,
//        event_label = request.params.eventLabel,
//        n_mix = request.params.nMix,
//        covariance_type = request.params.covarianceType,
//        description = request.params.description;
//    dao.updateGMM(gmm_params, event_label, n_mix, covariance_type, description).then(
//        function (gmm_id) {
//            response.success({
//                code: 0,
//                gmmId: gmm_id,
//                message: "gmm params update successfully!"
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
//AV.Cloud.define("updateHMM", function (request, response) {
//    var hmm_params = request.params.hmmParams,
//        event_label = request.params.eventLabel,
//        n_component = request.params.nComponent,
//        description = request.params.description;
//    dao.updateHMM(hmm_params, event_label, n_component, description).then(
//        function (hmm_id) {
//            response.success({
//                code: 0,
//                hmmId: hmm_id,
//                message: "hmm params update successfully!"
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

AV.Cloud.define("updateGMMHMM", function (request, response) {
    var tag = request.params.tag,
        gmm_params = request.params.gmmParams,
        hmm_params = request.params.hmmParams,
        event_label = request.params.eventLabel,
        n_component = request.params.nComponent,
        n_mix = request.params.nMix,
        covariance_type = request.params.covarianceType,
        description = request.params.description;
    config = request.params.config;
    dao.updateGMMHMM(tag, gmm_params, hmm_params, event_label, n_component, n_mix, covariance_type, description, config).then(
        function (gmmhmm_id) {
            response.success({
                code: 0,
                hmmId: gmmhmm_id,
                message: "gmmhmm params update successfully!"
            });
        },
        function (err) {
            response.error({
                code: 1,
                message: err
            });
        }
    );
});

AV.Cloud.define("getRecentGMMHMM", function (request, response) {
    var tag = request.params.tag,
        event_label = request.params.eventLabel;
    dao.getRecentGMMHMM(tag, event_label).then(
        function (gmmhmm) {
            response.success({
                code: 0,
                gmmhmm: gmmhmm,
                message: "Retrieve gmmhmm params successfully!"
            });
        },
        function (err) {
            response.error({
                code: 1,
                message: err
            });
        }
    );
});


//AV.Cloud.define("getRecentGMM", function (request, response) {
//    var event_label = request.params.eventLabel;
//    dao.getRecentGMM(event_label).then(
//        function (gmm) {
//            response.success({
//                code: 0,
//                gmm: gmm,
//                message: "Retrieve gmm params successfully!"
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
//
//AV.Cloud.define("getRecentHMM", function (request, response) {
//    var event_label = request.params.eventLabel;
//    dao.getRecentHMM(event_label).then(
//        function (hmm) {
//            response.success({
//                code: 0,
//                hmm: hmm,
//                message: "Retrieve hmm params successfully!"
//            });
//        },
//        function (error) {
//            response.error({
//                code: 1,
//                message: error
//            });
//        }
//    );
//});

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
            console.log(model_id);
            response.success({
                code: 0,
                model: model_id,
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






var obs = [[{"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
    {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
    {"motion": "walking", "sound": "tableware", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
    {"motion": "sitting", "sound": "tableware", "location": "residence"},
    {"motion": "sitting", "sound": "others", "location": "glass_store"}],
    [{"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
        {"motion": "walking", "sound": "laugh", "location": "glass_store"},
        {"motion": "walking", "sound": "keyboard", "location": "glass_store"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"}],
    [{"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "tableware", "location": "residence"},
        {"motion": "walking", "sound": "others", "location": "glass_store"},
        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "keyboard", "location": "residence"}],
    [{"motion": "walking", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "residence"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "laugh", "location": "residence"},
        {"motion": "walking", "sound": "tableware", "location": "chinese_restaurant"}],
    [{"motion": "walking", "sound": "tableware", "location": "glass_store"},
        {"motion": "walking", "sound": "laugh", "location": "glass_store"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"}],
    [{"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "residence"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"}],
    [{"motion": "sitting", "sound": "keyboard", "location": "glass_store"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "talking", "location": "glass_store"},
        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"}],
    [{"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "keyboard", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "others", "location": "glass_store"}],
    [{"motion": "sitting", "sound": "tableware", "location": "glass_store"},
        {"motion": "walking", "sound": "others", "location": "residence"},
        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"}],
    [{"motion": "walking", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
        {"motion": "walking", "sound": "laugh", "location": "glass_store"}]];


//m = method.trainWithRandomObs("GMMHMM", "random_generated_base_model", "dining.chineseRestaurant", 10, 100);
//m = method.trainWithSpecificObs("GMMHMM", "random_generated_base_model", "dining.chineseRestaurant", obs, "test for UpdateModel");

var senz_prob_list = {
    "probSenzList": [
        {
            "motion": {
                "Riding": 0.1,
                "Walking": 0.8,
                "Running": 0.0001,
                "Driving": 0.0001,
                "Sitting": 0.0998
            },
            "location": {
                "chinese_restaurant": 0.5,
                "glass_store": 0.3,
                "home": 0.2
            },
            "sound": {
                "talk": 0.7,
                "tree": 0.2
            },
            "timestamp": 1234567
        },
        {
            "motion": {
                "Riding": 0.1,
                "Walking": 0.8,
                "Running": 0.0001,
                "Driving": 0.0001,
                "Sitting": 0.0998
            },
            "location": {
                "chinese_restaurant": 0.5,
                "glass_store": 0.3,
                "home": 0.2
            },
            "sound": {
                "talk": 0.7,
                "tree": 0.2
            },
            "timestamp": 1345678
        },
        {
            "motion": {
                "Riding": 0.1,
                "Walking": 0.8,
                "Running": 0.0001,
                "Driving": 0.0001,
                "Sitting": 0.0998
            },
            "location": {
                "chinese_restaurant": 0.5,
                "glass_store": 0.3,
                "home": 0.2
            },
            "sound": {
                "talk": 0.7,
                "tree": 0.2
            },
            "timestamp": 1456789
        },
        {
            "motion": {
                "Riding": 0.1,
                "Walking": 0.8,
                "Running": 0.0001,
                "Driving": 0.0001,
                "Sitting": 0.0998
            },
            "location": {
                "chinese_restaurant": 0.5,
                "glass_store": 0.3,
                "home": 0.2
            },
            "sound": {
                "talk": 0.7,
                "tree": 0.2
            },
            "timestamp": 1567890
        }
    ],
    "strategy": "SELECT_MAX_PROB"
};

//algo.prob2muti(senz_prob_list);