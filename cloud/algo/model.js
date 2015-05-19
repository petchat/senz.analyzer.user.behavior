/**
 * Created by MeoWoodie on 5/15/15.
 */

var req    = require("request");
var config = require("cloud/config.js");

var Algo = config.Algo;

exports.Classifier = function (algo_type, tag, event_labels){
    var _Models = [],
        _tag    = "",
        _e_labels = [];

    var classify_url = "";

    var _configuration = function (){
        _tag = tag;
        classify_url = Algo[algo_type]["classify"];

        var promises = [];
        event_labels.forEach(function (event_label){
            promises.push(Algo[algo_type]["getModel"](_tag, event_label));
        });
        return AV.Promise.all(promises).then(
            function (models){
                models.forEach(function (model){
                    if (model != undefined) {
                        _Models.push(model);
                        _e_labels.push(model["eventLabel"]);
                    }
                });
            },
            function (error){
                var failed = new AV.Promise();
                failed.reject(error);
            }
        );
    };

    var _classify = function (seq){
        var data = {};
        data["seq"] = seq;
        data["models"] = [];
        _Models.forEach(function (model){
            data["models"].push(model["model"]);
        });
        var promise = new AV.Promise();
        req.post(
            {
                url: classify_url,
                json: data
            },
            function (err, httpResponse, body) {
                console.log('Received result successfully.');
                if (body["code"] == 0) {
                    var result = body['result'];
                    console.log(result);
                    promise.resolve(result);
                }
                else {
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    };

    return {
        configuration: _configuration,
        classify: _classify
    }
};

// Usage:
exports.Model = function (algo_type, tag, event_label) {
    var _config  = {},
        _model   = {},
        _tag     = "",
        _e_label = "",
        data     = {};

    var train_url = "",
        train_randomly_url = "";

    var _configuration = function () {
        _tag               = tag;
        _e_label           = event_label;
        train_url          = Algo[algo_type]["train"];
        train_randomly_url = Algo[algo_type]["trainRandomly"];
        return _getRecentModel();
    };

    var _getRecentModel = function (){
        var promise = new AV.Promise();
        return Algo[algo_type]["getModel"](_tag, _e_label).then(
            function (model){
                _model  = model["model"];
                _config = model["config"];
                data["model"]  = _model;
                data["config"] = _config;
                promise.resolve(model);
            },
            function (error){
                promise.reject(error);
            }
        );
    };

    var _updateModel = function (description){
        var promise = new AV.Promise();
        return Algo[algo_type]["updateModel"](_tag, _e_label, _model, _config, description).then(
            function (model_id){
                promise.resolve(model_id);
            },
            function (error){
                promise.reject(error);
            }
        );
    };

    var _train = function (obs, n_iter){
        data["obs"] = obs;
        data["model"]["nIter"] = n_iter;
        var promise = new AV.Promise();
        req.post(
            {
                url: train_url,
                json: data
            },
            function (err, httpResponse, body) {
                console.log('Received result successfully.');
                if (body["code"] == 0) {
                    var result = body['result'];
                    // Update the model.
                    _model = result;
                    promise.resolve(result);
                }
                else {
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    };

    var _trainRandomly = function (obs_length, obs_count, event_prob_map, n_iter) {
        data["obsEvent"] = _e_label;
        data["obsLength"] = obs_length;
        data["obsCount"] = obs_count;
        data["model"]["nIter"] = n_iter;
        data["eventProbMap"] = event_prob_map;
        var promise = new AV.Promise();
        req.post(
            {
                url: train_randomly_url,
                json: data
            },
            function (err, httpResponse, body) {
                console.log('Received result successfully.');
                //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
                if (body["code"] == 0) {
                    var result = body['result'];
                    _model = result;
                    promise.resolve(result);
                }
                else {
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    };

    return {
        configuration: _configuration,
        train: _train,
        trainRandomly: _trainRandomly,
        getModel: _getRecentModel,
        updateModel: _updateModel,
        model: _model,
        config: _config
    }
};