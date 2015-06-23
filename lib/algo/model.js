/**
 * Created by MeoWoodie on 5/15/15.
 */
var AV  = require("leanengine");
var req = require("request");
var config = require("../config.js");
var dao_config = require("../dao/dao_config.js");

var Algo = config.Algo;

// Usage:
exports.Model = function (algo_type, tag, label) {
    var _config = {},
        _model = {},
        _tag = "",
        _label = "",
        data = {};

    var train_url = "",
        train_randomly_url = "",
        train_headers = "",
        train_randomly_headers = "";

    var _configuration = function () {
        _tag = tag;
        _label = label;
        train_url = Algo[algo_type]["train"]["url"];
        train_headers = Algo[algo_type]["train"]["headers"];
        train_randomly_headers = Algo[algo_type]["train"]["headers"];
        train_randomly_url = Algo[algo_type]["trainRandomly"]["url"];
        return _getRecentModel();
    };

    var _getRecentModel = function () {
        var promise = new AV.Promise();
        return Algo[algo_type]["getModel"](_tag, _label).then(
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
        return Algo[algo_type]["updateModel"](_tag, _label, _model, _config, description);
    };

    var _initModel = function (tag, label, init_model) {
        // Init private members.
        _tag = tag;
        _label = label;

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
                return Algo[algo_type]["initModel"](tag, label, init_model, model_config, description);
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
                json: data,
                headers: train_headers
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
        data["obsEvent"] = _label;
        data["obsLength"] = obs_length;
        data["obsCount"] = obs_count;
        data["model"]["nIter"] = n_iter;
        data["eventProbMap"] = event_prob_map;
        var promise = new AV.Promise();
        req.post(
            {
                url: train_randomly_url,
                json: data,
                headers: train_randomly_headers
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