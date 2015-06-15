/**
 * Created by MeoWoodie on 5/18/15.
 */
var req    = require("request");
var config = require("../config.js");
var prob2muti_url = config.Prob2muti;

exports.prob2muti = function (prob_senz_list){
    //var data = {};
    //data["prob_senz_list"] = seq;
    //data["models"] = [];
    var promise = new AV.Promise();
    req.post(
        {
            url: prob2muti_url,
            json: prob_senz_list
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