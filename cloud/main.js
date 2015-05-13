var dao = require("cloud/dao.js");
// Use AV.Cloud.define to define as many cloud functions as you want.
// For example:
AV.Cloud.define("updateGMM", function (request, response) {
    var gmm_params = request.params.gmmParams,
        event_label = request.params.eventLabel,
        n_mix = request.params.nMix,
        covariance_type = request.params.covarianceType,
        description = request.params.description;
    dao.updateGMM(gmm_params, event_label, n_mix, covariance_type, description).then(
        function (gmm_id) {
            response.success({
                code: 0,
                gmmId: gmm_id,
                message: "gmm params update successfully!"
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

AV.Cloud.define("updateHMM", function (request, response) {
    var hmm_params = request.params.hmmParams,
        event_label = request.params.eventLabel,
        n_component = request.params.nComponent,
        description = request.params.description;
    dao.updateHMM(hmm_params, event_label, n_component, description).then(
        function (hmm_id) {
            response.success({
                code: 0,
                hmmId: hmm_id,
                message: "hmm params update successfully!"
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

AV.Cloud.define("updateGMMHMM", function (request, response) {
    var tag = request.params.tag,
        gmm_params = request.params.gmmParams,
        hmm_params = request.params.hmmParams,
        event_label = request.params.eventLabel,
        n_component = request.params.nComponent,
        n_mix = request.params.nMix,
        covariance_type = request.params.covarianceType,
        description = request.params.description;
    dao.updateGMMHMM(tag, gmm_params, hmm_params, event_label, n_component, n_mix, covariance_type, description).then(
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


AV.Cloud.define("getRecentGMM", function (request, response) {
    var event_label = request.params.eventLabel;
    dao.getRecentGMM(event_label).then(
        function (gmm) {
            response.success({
                code: 0,
                gmm: gmm,
                message: "Retrieve gmm params successfully!"
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


AV.Cloud.define("getRecentHMM", function (request, response) {
    var event_label = request.params.eventLabel;
    dao.getRecentHMM(event_label).then(
        function (hmm) {
            response.success({
                code: 0,
                hmm: hmm,
                message: "Retrieve hmm params successfully!"
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

var gmm_params = {
    "covarianceType": "full",
    "nMix": 4,
    "params": [
        {
            "covars": [
                [472.27800685, 472.27800685, 472.27800685],
                [697.52335729, 697.52335729, 697.52335729],
                [530.22124671, 530.22124671, 530.22124671],
                [683.69353879, 683.69353879, 683.69353879]
            ],
            "means": [
                [0.31670098, 19.11287179, 10.44514015],
                [0.32403931, 44.43047089, 10.69711672],
                [0.31640365, 22.64918034, 12.02879255],
                [0.3141375, 38.86666949, 11.48627219]
            ],
            "weights": [0.29628029, 0.23860758, 0.25002084, 0.21509129]
        },
        {
            "covars": [
                [471.70382709, 471.70382709, 471.70382709],
                [696.80846154, 696.80846154, 696.80846154],
                [529.57298416, 529.57298416, 529.57298416],
                [683.2172196, 683.2172196, 683.2172196]
            ],
            "means": [
                [0.31844091, 19.09680206, 10.44945422],
                [0.32515545, 44.39202715, 10.70965751],
                [0.31788919, 22.63183586, 12.03638126],
                [0.31535478, 38.85864214, 11.50031672]
            ],
            "weights": [0.29632258, 0.23851096, 0.25003777, 0.21512869]
        },
        {
            "covars": [
                [446.11339906, 446.11339906, 446.11339906],
                [677.63354862, 677.63354862, 677.63354862],
                [663.83568757, 663.83568757, 663.83568757],
                [500.78388024, 500.78388024, 500.78388024]
            ],
            "means": [
                [0.32317726, 17.86576794, 10.65557801],
                [0.32433085, 42.17910084, 11.01598356],
                [0.31646136, 37.09618443, 11.78900317],
                [0.32218379, 21.12328751, 12.31919079]
            ],
            "weights": [0.29852455, 0.23476512, 0.21422263, 0.2524877]
        },
        {
            "covars": [
                [459.68500524, 459.68500524, 459.68500524],
                [689.55964417, 689.55964417, 689.55964417],
                [516.09011551, 516.09011551, 516.09011551],
                [675.41996403, 675.41996403, 675.41996403]
            ],
            "means": [
                [0.32292795, 18.48890516, 10.55491072],
                [0.32628212, 43.2975017, 10.87184719],
                [0.32187151, 21.88796335, 12.18269494],
                [0.31753251, 38.01261467, 11.65670113]
            ],
            "weights": [0.29741866, 0.23660316, 0.25123148, 0.21474671]
        }
    ]
};

var hmm_params = {
    "startProb": [0.41851852, 0.30740741, 0.08518519, 0.18888889],
    "transMat": [
        [0.50881945, 0.19622023, 0.19874008, 0.09622023],
        [0.30335416, 0.40670833, 0.19664584, 0.09329167],
        [0.08977197, 0.19488598, 0.51022803, 0.20511402],
        [0.1950282, 0.09337093, 0.0950282, 0.61657267]
    ]
};

//dao.updateGMMHMM("random_sample_1000", gmm_params, hmm_params, "dining_out_in_chinese_restaurant", 4, 4, "full", "It's a trial for gmmhmm update");
//res = dao.getRecentGMMHMM("random_sample_1000", "dining_out_in_chinese_restaurant");
//res.then(function(res){console.log(res)});