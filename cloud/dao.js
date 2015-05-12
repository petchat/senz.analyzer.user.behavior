/**
 * Created by MeoWoodie on 5/11/15.
 */



var _updateGMM = function (gmm_params, event_label, n_mix, covariance_type, description){
    var promise = new AV.Promise();
    var GMM = AV.Object.extend("gmm");
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
        function (gmm){
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

var _updateHMM = function (hmm_params, event_label, n_component, description){
    var promise = new AV.Promise();
    var HMM = AV.Object.extend("hmm");
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
        function (gmm){
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

exports.getRecentHMM = function (event_label){
    var promise = new AV.Promise();
    var HMM = AV.Object.extend("hmm");
    var query = new AV.Query(HMM);
    query.equalTo("eventLabel", event_label);
    query.descending("timestamp");
    query.limit(1);
    query.find().then(
        function (results){
            console.log("Successfully retrieved " + results.length + " HMM.");
            var hmm = {};
            results.forEach(function (result){
                var event_label = result.get("eventLabel");
                var hmm_params  = result.get("params");
                var n_component = result.get("nComponent");
                var description = result.get("description");
                var timestamp   = result.get("timestamp");
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
        function (error_info){
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.getRecentGMM = function (event_label){
    var promise = new AV.Promise();
    var GMM = AV.Object.extend("gmm");
    var query = new AV.Query(GMM);
    query.equalTo("eventLabel", event_label);
    query.descending("timestamp");
    query.limit(1);
    query.find().then(
        function (results){
            console.log("Successfully retrieved " + results.length + " HMM.");
            var hmm = {};
            results.forEach(function (result){
                var event_label = result.get("eventLabel");
                var hmm_params  = result.get("params");
                var n_mix = result.get("nMix");
                var covariance_type = result.get("covarianceType");
                var description = result.get("description");
                var timestamp   = result.get("timestamp");
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
        function (error_info){
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.getRecentGMMHMM = function (event_label){
    var promise = new AV.Promise();
    var GMMHMM = AV.Object.extend("gmmhmm");
    var query = new AV.Query(GMMHMM);
    query.equalTo("eventLabel", event_label);
    query.descending("timestamp");
    query.include("gmm");
    query.include("hmm");
    query.limit(1);
    query.find().then(
        function (results){
            console.log("Successfully retrieved " + results.length + " HMM.");
            var gmmhmm = {};
            results.forEach(function (result){
                var event_label   = result.get("eventLabel");
                var request_count = result.get("requestCount");
                var gmm = result.get("gmm")["attributes"];
                var hmm = result.get("hmm")["attributes"];
                var description = result.get("description");
                var timestamp   = result.get("timestamp");
                gmmhmm = {
                    "eventLabel": event_label,
                    "requestCount": request_count,
                    "gmm": gmm,
                    "hmm": hmm,
                    "description": description,
                    "timestamp": timestamp
                };
            });
            promise.resolve(gmmhmm);
        },
        function (error_info){
            console.log("Error occurs! " + error_info.code + ' ' + error_info.message);
            promise.reject(error_info);
        }
    );
    return promise;
};

exports.updateGMM = function(gmm_params, event_label, n_mix, covariance_type, description){
    _updateGMM(gmm_params, event_label, n_mix, covariance_type, description);
};

exports.updateHMM = function(hmm_params, event_label, n_component, description){
    _updateHMM(hmm_params, event_label, n_component, description);
};

exports.updateGMMHMM = function (gmm_params, hmm_params, event_label, n_component, n_mix, covariance_type, description){
    var promises = [];
    promises.push(_updateGMM(gmm_params, event_label, n_mix, covariance_type, description));
    promises.push(_updateHMM(hmm_params, event_label, n_component, description));
    return AV.Promise.when(promises).then(
        function (gmm_id, hmm_id){
            var promise = new AV.Promise();
            var GMMHMM = AV.Object.extend("gmmhmm");
            var _gmmhmm = new GMMHMM();
            // Get current time
            var timestamp = new Date();
            // Create pointer for gmm and hmm.
            var gmm_pointer = AV.Object.createWithoutData("gmm", gmm_id);
            var hmm_pointer = AV.Object.createWithoutData("hmm", hmm_id);
            // Set gmmhmm's parameters.
            _gmmhmm.set("gmm", gmm_pointer);
            _gmmhmm.set("hmm", hmm_pointer);
            _gmmhmm.set("eventLabel", event_label);
            _gmmhmm.set("requestCount", 0);
            _gmmhmm.set("description", description);
            _gmmhmm.set("timestamp", timestamp);
            _gmmhmm.save().then(
                function (gmmhmm){
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

