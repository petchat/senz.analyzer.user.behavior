/**
 * Created by MeoWoodie on 5/15/15.
 */

var req = require("request");
var config = require("cloud/config.js");
var dao_config = require("cloud/dao/dao_config.js");

var Algo = config.Algo;

exports.BehaviorClassifier = function (algo_type, tag, event_labels) {
    var _Models = [],
        _tag = "",
        _e_labels = [];

    var classify_url = "";

    var _configuration = function () {
        _tag = tag;
        classify_url = Algo[algo_type]["classify"];

        var promises = [];
        event_labels.forEach(function (event_label) {
            promises.push(Algo[algo_type]["getModel"](_tag, event_label));
        });

        return AV.Promise.all(promises).then(
            function (models) {
                // TODO return promise
                models.forEach(function (model) {
                    if (model != undefined) {
                        _Models.push(model);
                        _e_labels.push(model["eventLabel"]);
                    }
                });
                return AV.Promise.as("ok");
            },
            function (error) {
                return AV.Promise.error(error);
            }
        );
    };

    var _classify = function (seq) {
        var data = {};
        data["seq"] = seq;
        data["models"] = [];
        data["config"] = [];
        _Models.forEach(function (model) {
            data["models"].push(model["model"]);
            data["config"].push(model["config"]);
        });
        console.log(JSON.stringify(data));
        var promise = new AV.Promise();
        req.post(
            {
                url: classify_url,
                json: data
            },
            function (err, httpResponse, body) {
                console.log('Received result successfully.');
                if (body["code"] == 0) {
                    var probs = body['result'];
                    var result = {};
                    for (var i = 0; i < probs.length; i++) {
                        result[_e_labels[i]] = probs[i];
                    }
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
exports.BehaviorModel = function (algo_type, tag, event_label) {
    var _config = {},
        _model = {},
        _tag = "",
        _e_label = "",
        data = {};

    var train_url = "",
        train_randomly_url = "";

    var _configuration = function () {
        _tag = tag;
        _e_label = event_label;
        train_url = Algo[algo_type]["train"];
        train_randomly_url = Algo[algo_type]["trainRandomly"];
        return _getRecentModel();
    };

    var _getRecentModel = function () {
        var promise = new AV.Promise();
        return Algo[algo_type]["getModel"](_tag, _e_label).then(
            function (model) {
                _model = model["model"];
                _config = model["config"];
                //console.log("get");
                data["model"] = _model;
                data["config"] = _config;
                console.log('untreated data content is:\n' + JSON.stringify(data, null, 4));
                promise.resolve(model);
            },
            function (error) {
                promise.reject(error);
            }
        );
    };

    var _updateModel = function (description) {
        //console.log("update");
        //console.log('untreated data content is:\n' + JSON.stringify(_model, null, 4));
        return Algo[algo_type]["updateModel"](_tag, _e_label, _model, _config, description);
    };

    var _initModel = function (tag, event_label, init_model) {
        // Init private members.
        _tag = tag;
        _e_label = event_label;

        var description = "It's initiation of this model.";
        return dao_config.getConfig().then(
            function (config) {
                var model_config = {
                    "logType": config["log_type"],
                    "eventType": config["events_type"],
                    "motionType": config[config["log_type"]["motion"]],
                    "soundType": config[config["log_type"]["sound"]],
                    "locationType": config[config["log_type"]["location"]]
                };
                return Algo[algo_type]["initModel"](tag, event_label, init_model, model_config, description);
            },
            function (error) {
                return AV.Promise.error(error);
            }
        );
    };

    var _train = function (obs, n_iter) {
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
                    // Update the model
                    _model = result;
                    //console.log("train");
                    //console.log('untreated data content is:\n' + JSON.stringify(_model, null, 4));
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
        initModel: _initModel,
        model: _model,
        config: _config,
        tag: _tag
    }
};