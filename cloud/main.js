var dao = require("cloud/dao/dao_model.js");
var method = require("cloud/method.js");
var algo = require("cloud/algo/model.js");

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



//var obs = [[{"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//    {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//    {"motion": "walking", "sound": "tableware", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//    {"motion": "sitting", "sound": "tableware", "location": "residence"},
//    {"motion": "sitting", "sound": "others", "location": "glass_store"}],
//    [{"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
//        {"motion": "walking", "sound": "laugh", "location": "glass_store"},
//        {"motion": "walking", "sound": "keyboard", "location": "glass_store"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"}],
//    [{"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "tableware", "location": "residence"},
//        {"motion": "walking", "sound": "others", "location": "glass_store"},
//        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "keyboard", "location": "residence"}],
//    [{"motion": "walking", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "residence"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "laugh", "location": "residence"},
//        {"motion": "walking", "sound": "tableware", "location": "chinese_restaurant"}],
//    [{"motion": "walking", "sound": "tableware", "location": "glass_store"},
//        {"motion": "walking", "sound": "laugh", "location": "glass_store"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"}],
//    [{"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "residence"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"}],
//    [{"motion": "sitting", "sound": "keyboard", "location": "glass_store"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "talking", "location": "glass_store"},
//        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"}],
//    [{"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "keyboard", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "others", "location": "glass_store"}],
//    [{"motion": "sitting", "sound": "tableware", "location": "glass_store"},
//        {"motion": "walking", "sound": "others", "location": "residence"},
//        {"motion": "sitting", "sound": "tableware", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "laugh", "location": "chinese_restaurant"}],
//    [{"motion": "walking", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "glass_store"},
//        {"motion": "sitting", "sound": "others", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "laugh", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "sitting", "sound": "talking", "location": "chinese_restaurant"},
//        {"motion": "walking", "sound": "laugh", "location": "glass_store"}]];


//m = method.trainWithRandomObs("GMMHMM", "random_generated_base_model", "dining.chineseRestaurant", 10, 100);
//m = method.trainWithSpecificObs("GMMHMM", "random_generated_base_model", "dining.chineseRestaurant", obs, "test for UpdateModel");
