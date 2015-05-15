/**
 * Created by MeoWoodie on 5/15/15.
 */
var req = require("request");
var config = require("cloud/config.js");

var algo_url = {
    "trainGMMHMM": "http://127.0.0.1:9010/trainingGMMHMM/",
    "trainGMMHMMrandomly": "http://127.0.0.1:9010/trainingGMMHMMrandomly/",
    "classifyGMMHMM": "http://127.0.0.1:9010/classifyGMMHMM/"
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
