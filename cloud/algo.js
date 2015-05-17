/**
 * Created by MeoWoodie on 5/15/15.
 */
var req  = require("request");
//var config = require("cloud/config.js");
var util = require("cloud/util.js");

var algo_url = {
    GMMHMM: {
        train: "http://127.0.0.1:9010/trainingGMMHMM/",
        trainRandomly: "http://127.0.0.1:9010/trainingGMMHMMrandomly/",
        classify: "http://127.0.0.1:9010/classifyGMMHMM/"
    }
};

exports.trainGMMHMM = function (obs, model, config){
    var data = {};
    data["obs"] = obs;
    data["model"] = model;
    data["config"] = config;
    var promise = new AV.Promise();
    req.post(
        {
            url:  algo_url["trainGMMHMM"],
            json: data
        },
        function (err, httpResponse, body){
            console.log('Received result successfully.');
            //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
            if (body["code"] == 0){
                var result = body['result'];
                promise.resolve(result);
            }
            else{
                var error = body["message"];
                promise.reject(error);
            }
        }
    );
    return promise;
};

exports.trainGMMHMMrandomly = function (obs_event, obs_length, obs_count, model, config, event_prob_map){
    var data = {};
    data["obsEvent"] = obs_event;
    data["obsLength"] = obs_length;
    data["obsCount"] = obs_count;
    data["model"] = model;
    data["config"] = config;
    data["eventProbMap"] = event_prob_map;
    var promise = new AV.Promise();
    req.post(
        {
            url:  algo_url["trainGMMHMMrandomly"],
            json: data
        },
        function (err, httpResponse, body){
            console.log('Received result successfully.');
            //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
            if (body["code"] == 0){
                var result = body['result'];
                console.log(result);
                promise.resolve(result);
            }
            else{
                var error = body["message"];
                promise.reject(error);
            }
        }
    );
    return promise;
};

exports.classifyGMMHMM = function(seq, models){
    var data = {};
    data["seq"] = seq;
    data["models"] = models;
    console.log(JSON.stringify(data, null, 4));
    var promise = new AV.Promise();
    req.post(
        {
            url:  algo_url["classifyGMMHMM"],
            json: data
        },
        function (err, httpResponse, body){
            console.log('Received result successfully.');
            //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
            if (body["code"] == 0){
                var result = body['result'];
                promise.resolve(result);
            }
            else{
                var error = body["message"];
                promise.reject(error);
            }
        }
    );
    return promise;
};

exports.Model = function (algo, model, config){
    var _config = {},
        _model  = {},
        data    = {};

    var train_url          = "",
        train_randomly_url = "",
        classify_url       = "";

    var constructor = function(){
        _config = config;
        _model  = model;
        data["model"]  = model;
        data["config"] = config;
        train_url          = algo_url[algo]["train"];
        train_randomly_url = alog[algo]["trainrandomly"];
        classify_url       = algo_url[algo]["classify"];
    };
    constructor();

    this.train = function (obs){
        data["obs"] = obs;
        var promise = new AV.Promise();
        req.post(
            {
                url:  train_url,
                json: data
            },
            function (err, httpResponse, body){
                console.log('Received result successfully.');
                //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
                if (body["code"] == 0){
                    var result = body['result'];
                    promise.resolve(result);
                }
                else{
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    };

    this.trainRandomly = function (obs_event, obs_length, obs_count, event_prob_map){
        data["obsEvent"] = obs_event;
        data["obsLength"] = obs_length;
        data["obsCount"] = obs_count;
        data["eventProbMap"] = event_prob_map;
        var promise = new AV.Promise();
        req.post(
            {
                url:  train_randomly_url,
                json: data
            },
            function (err, httpResponse, body){
                console.log('Received result successfully.');
                //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
                if (body["code"] == 0){
                    var result = body['result'];
                    console.log(result);
                    promise.resolve(result);
                }
                else{
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    };

    this.classify = function (seq, models){
        var valid_models_param = [];
        models.forEach(function (model){
            if (model != undefined && util.checkModelConfig(model._config, config)) {
                valid_models_param.push(model._model);
            }
        });
        data["seq"] = seq;
        data["models"] = valid_models_param;
        var promise = new AV.Promise();
        req.post(
            {
                url:  classify_url,
                json: data
            },
            function (err, httpResponse, body){
                console.log('Received result successfully.');
                //console.log('The content of result is:\n' + JSON.stringify(body, null, 4));
                if (body["code"] == 0){
                    var result = body['result'];
                    promise.resolve(result);
                }
                else{
                    var error = body["message"];
                    promise.reject(error);
                }
            }
        );
        return promise;
    }
};