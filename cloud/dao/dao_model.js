/**
 * Created by MeoWoodie on 5/11/15.
 */
var HMM = AV.Object.extend("hmm");
var GMM = AV.Object.extend("gmm");
var GMMHMM = AV.Object.extend("gmmhmm");

var _updateGMM = function (gmm_params, event_label, n_mix, covariance_type, description) {
    var promise = new AV.Promise();
    //var GMM = AV.Object.extend("gmm");
    var _gmm = new GMM();
    // Get current time
    var timestamp = new Date();
    // Set gmm's parameters.
    _gmm.set('params', gmm_params);
    _gmm.set('eventLabel', event_label);
    _gmm.set("nMix", n_mix);
    _gmm.set("covarianceType", covariance_type);
    _gmm.set("description", description);
    _gmm.set("timestamp", timestamp);
    _gmm.save().then(
        function (gmm) {
            console.log("New GMM object created with objectId: " + gmm.id);
            promise.resolve(gmm.id);
        },
        function (error_info) {
            console.log("Failed to create new GMM object, with error code: " + error_info.code + " " + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

var _updateHMM = function (hmm_params, event_label, n_component, description) {
    var promise = new AV.Promise();
    //var HMM = AV.Object.extend("hmm");
    var _hmm = new HMM();
    // Get current time
    var timestamp = new Date();
    // Set gmm's parameters.
    _hmm.set("params", hmm_params);
    _hmm.set("eventLabel", event_label);
    _hmm.set("nComponent", n_component);
    _hmm.set("description", description);
    _hmm.set("timestamp", timestamp);
    _hmm.save().then(
        function (gmm) {
            console.log("New HMM object created with objectId: " + gmm.id);
            promise.resolve(gmm.id);
        },
        function (error_info) {
            console.log("Failed to create new HMM object, with error code: " + error_info.code + " " + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

var _updateGMMHMM = function (tag, event_label, model, config, description) {
    var promises = [];
    var gmm_params = model["gmmParams"],
        hmm_params = model["hmmParams"],
        n_component = model["nComponent"],
        n_mix = model["nMix"],
        covariance_type = model["covarianceType"];
    promises.push(_updateGMM(gmm_params, event_label, n_mix, covariance_type, description));
    promises.push(_updateHMM(hmm_params, event_label, n_component, description));
    return AV.Promise.when(promises).then(
        function (gmm_id, hmm_id) {
            var promise = new AV.Promise();
            var GMMHMM = AV.Object.extend("gmmhmm");
            var _gmmhmm = new GMMHMM();
            // Get current time
            var timestamp = new Date();
            // Create pointer for gmm and hmm.
            var gmm_pointer = AV.Object.createWithoutData("gmm", gmm_id);
            var hmm_pointer = AV.Object.createWithoutData("hmm", hmm_id);
            // Set gmmhmm's parameters.
            _gmmhmm.set("tag", tag);
            _gmmhmm.set("gmm", gmm_pointer);
            _gmmhmm.set("hmm", hmm_pointer);
            _gmmhmm.set("eventLabel", event_label);
            _gmmhmm.set("requestCount", 0);
            _gmmhmm.set("description", description);
            _gmmhmm.set("timestamp", timestamp);
            _gmmhmm.set("config", config);
            _gmmhmm.save().then(
                function (gmmhmm) {
                    console.log("New GMMHMM object created with objectId: " + gmmhmm.id);
                    promise.resolve(gmmhmm.id);
                },
                function (error_info) {
                    console.log("Failed to create new GMMHMM object, with error code: " + error_info.code + " " + error_info.message);
                    promise.reject(error_info);
                }
            );
            return promise;
        }
    );
};

exports.getRecentHMM = function (event_label) {
    var promise = new AV.Promise();
    //var HMM = AV.Object.extend("hmm");
    var query = new AV.Query(HMM);
    query.equalTo("eventLabel", event_label);
    query.descending("timestamp");
    query.limit(1);
    query.find().then(
        function (results) {
            console.log("Successfully retrieved " + results.length + " HMM.");
            var hmm = {};
            results.forEach(function (result) {
                var event_label = result.get("eventLabel");
                var hmm_params = result.get("params");
                var n_component = result.get("nComponent");
                var description = result.get("description");
                var timestamp = result.get("timestamp");
                hmm = {
                    "eventLabel": event_label,
                    "params": hmm_params,
                    "nComponent": n_component,
                    "description": description,
                    "timestamp": timestamp
                };
            });
            promise.resolve(hmm);
        },
        function (error_info) {
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.getRecentGMM = function (event_label) {
    var promise = new AV.Promise();
    //var GMM = AV.Object.extend("gmm");
    var query = new AV.Query(GMM);
    query.equalTo("eventLabel", event_label);
    query.descending("timestamp");
    query.limit(1);
    query.find().then(
        function (results) {
            console.log("Successfully retrieved " + results.length + " HMM.");
            var hmm = {};
            results.forEach(function (result) {
                var event_label = result.get("eventLabel");
                var hmm_params = result.get("params");
                var n_mix = result.get("nMix");
                var covariance_type = result.get("covarianceType");
                var description = result.get("description");
                var timestamp = result.get("timestamp");
                hmm = {
                    "eventLabel": event_label,
                    "params": hmm_params,
                    "nMix": n_mix,
                    "covarianceType": covariance_type,
                    "description": description,
                    "timestamp": timestamp
                };
            });
            promise.resolve(hmm);
        },
        function (error_info) {
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.getRecentGMMHMM = function (tag, event_label) {
    var promise = new AV.Promise();
    //var GMMHMM = AV.Object.extend("gmmhmm");
    var query = new AV.Query(GMMHMM);
    query.equalTo("eventLabel", event_label);
    query.equalTo("tag", tag);
    query.descending("timestamp");
    query.include("gmm");
    query.include("hmm");
    query.limit(1);
    // TODO use first
    query.find().then(
        function (results) {
            console.log("Successfully retrieved " + results.length + " HMM.");
            var gmmhmm = {};
            if (results.length == 0) {
                // TODO change to reject
                promise.resolve(undefined);
                return;
            }
            results.forEach(function (result) {
                var event_label = result.get("eventLabel");
                var request_count = result.get("requestCount");
                var gmm_id = result.get("gmm").id;
                var hmm_id = result.get("hmm").id;
                var description = result.get("description");
                var timestamp = result.get("timestamp");
                // Useful info.
                var gmm = result.get("gmm")["attributes"];
                var hmm = result.get("hmm")["attributes"];
                var config = result.get("config");
                var model = {};
                model["nComponent"] = hmm["nComponent"];
                model["covarianceType"] = gmm["covarianceType"];
                model["nMix"] = gmm["nMix"];
                //model["nIter"] = 50;
                // TODO: revise start prob and trans mat to prior.
                //model["startProbPrior"] = hmm["params"]["startProb"];
                //model["transMatPrior"] = hmm["params"]["transMat"];
                //model["startProb"] = hmm["params"]["startProb"];
                //model["transMat"] = hmm["params"]["transMat"];
                //model["gmms"] = gmm["params"]["params"];
                model["hmmParams"] = {};
                model["hmmParams"]["startProb"] = hmm["params"]["startProb"];
                model["hmmParams"]["transMat"] = hmm["params"]["transMat"];
                model["hmmParams"]["startProbPrior"] = hmm["params"]["startProb"];
                model["hmmParams"]["transMatPrior"] = hmm["params"]["transMat"];

                model["gmmParams"] = {};
                model["gmmParams"]["params"] = gmm["params"]["params"];
                model["gmmParams"]["covarianceType"] = gmm["covarianceType"];
                model["gmmParams"]["nMix"] = gmm["nMix"];

                gmmhmm = {
                    "eventLabel": event_label,
                    "requestCount": request_count,
                    "gmmId": gmm_id,
                    "hmmId": hmm_id,
                    "description": description,
                    "timestamp": timestamp,
                    // Useful info.
                    "model": model,
                    "config": config
                };
            });
            promise.resolve(gmmhmm);
        },
        function (error_info) {
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.updateGMM = function (gmm_params, event_label, n_mix, covariance_type, description) {
    return _updateGMM(gmm_params, event_label, n_mix, covariance_type, description);
};

exports.updateHMM = function (hmm_params, event_label, n_component, description) {
    return _updateHMM(hmm_params, event_label, n_component, description);
};

exports.updateGMMHMM = function (tag, event_label, model, config, description) {
    return _updateGMMHMM(tag, event_label, model, config, description);
};

exports.initGMMHMM = function (tag, event_label, n_component, hmm_params, another_params, config, description) {
    var gmm_params = {
        "nMix": another_params["nMix"],
        "covarianceType": another_params["covarianceType"]
    };
    var model = {
        "gmmParams": gmm_params,
        "hmmParams": hmm_params,
        "nComponent": n_component,
        "nMix": another_params["nMix"],
        "covarianceType": another_params["covarianceType"]
    };
    return _updateGMMHMM(tag, event_label, model, config, description);
};
