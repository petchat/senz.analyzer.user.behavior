/**
 * Created by MeoWoodie on 5/15/15.
 */

var req = require("request");
var config = require("cloud/config.js");
//var dao_config = require("cloud/dao/dao_config.js");

var Algo = config.Algo;

exports.PoiClassifier = function (algo_type, tag, event_labels) {
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
