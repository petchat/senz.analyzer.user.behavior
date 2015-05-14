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

