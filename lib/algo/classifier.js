/**
 * Created by MeoWoodie on 5/15/15.
 */
var AV  = require("leanengine");
var req = require("request");
var config = require("../config.js");
//var dao_config = require("lib/dao/dao_config.js");

var Algo = config.Algo;

exports.Classifier = function (algo_type, tag, labels) {
    var _Models = [],
        _tag = "",
        _labels = [];

    var classify_url = "",
        classify_headers = "";

    var _configuration = function () {
        _tag = tag;
        classify_url = Algo[algo_type]["classify"]["url"];
        classify_headers = Algo[algo_type]["classify"]["headers"];

        var promises = [];
        labels.forEach(function (label) {
            promises.push(Algo[algo_type]["getModel"](_tag, label));
        });

        return AV.Promise.all(promises).then(
            function (models) {
                // TODO return promise
                models.forEach(function (model) {
                    if (model != undefined) {
                        _Models.push(model);
                        _labels.push(model["label"]);
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
                json: data,
                headers: classify_headers
            },
            function (err, httpResponse, body) {
                console.log('Received result successfully.');
                if (body["code"] == 0) {
                    var probs = body['result'];
                    console.log(probs);
                    var result = Algo[algo_type]["parser"](probs, _labels);
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
