/**
 * Created by MeoWoodie on 5/15/15.
 */

var req = require("request");
var config = require("../config.js");

var Algo = config.Algo;

exports.PoiClassifier = function (algo_type, tag) {
    var _model = {},
        _config = {},
        _tag = "",
        _label = "poi",
        classify_url = "";

    var _configuration = function () {
        _tag = tag;
        classify_url = Algo[algo_type]["classify"];
        return _getRecentModel();
    };

    var _getRecentModel = function () {
        var promise = new AV.Promise();
        return Algo[algo_type]["getModel"](_tag, _label).then(
            function (model) {
                _model = model["model"];
                _config = model["config"];
                ////console.log("get");
                //data["model"] = _model;
                //data["config"] = _config;
                //console.log('untreated data content is:\n' + JSON.stringify(data, null, 4));
                promise.resolve(model);
            },
            function (error) {
                promise.reject(error);
            }
        );
    };

    var _classify = function (poi_list) {
        var data = {};
        data["pois"] = poi_list;
        data["models"] = _model;
        data["config"] = _config;
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
