var AV       = require("leanengine");
var behavior = require("./lib/behavior.js");
var poi      = require("./lib/poi.js");
var config   = require("./lib/config.js");
var _        = require("underscore");

AV.Cloud.define("hello", function(request, response) {
  response.success("Hello world!");
});

// training & classification

AV.Cloud.define("trainWithRandomObs", function (request, response) {
  var algo_type   = request.params.algoType,
      tag         = request.params.tag,
      event_label = request.params.eventLabel,
      obs_length  = request.params.obsLength,
      obs_count   = request.params.obsCount,
      description = request.params.description;

  var date = new Date();

  behavior.trainWithRandomObs(algo_type, tag, event_label, obs_length, obs_count, description).then(
      function (model_id){
        console.log(model_id);
        response.success({
          code: 0,
          modelId: model_id,
          message: "Training successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});

AV.Cloud.define("trainWithSpecificObs", function (request, response) {
  var algo_type   = request.params.algoType,
      tag         = request.params.tag,
      event_label = request.params.eventLabel,
      obs         = request.params.obs,
      description = request.params.description;

  var date = new Date();

  behavior.trainWithSpecificObs(algo_type, tag, event_label, obs, description).then(
      function (model_id){
        //console.log(model_id);
        response.success({
          code: 0,
          modelId: model_id,
          message: "Training successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});


AV.Cloud.define("classifySingleSeq", function (request, response) {
  var algo_type = request.params.algoType,
      tag       = request.params.tag,
      seq       = request.params.seq;
  var date = new Date();

  behavior.classifySingleSeq(algo_type, tag, seq).then(
      function (scores){
        response.success({
          code: 0,
          scores: scores,
          message: "Classifying successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});

AV.Cloud.define("initModelParams", function (request, response) {
  var algo_type = request.params.algoType,
      tag       = request.params.tag,
      event_label = request.params.eventLabel;
  var date = new Date();

  behavior.initModelParams(algo_type, tag, event_label).then(
      function (model_id){
        response.success({
          code: 0,
          modelId: model_id,
          message: "Model init successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});


AV.Cloud.define("initAllEventsModelParams", function (request, response) {
  var algo_type = request.params.algoType,
      tag       = request.params.tag;
  var date = new Date();

  var promises = [];
  var eventsInfo = config.BehaviorInitParams[algo_type];
  _.keys(eventsInfo).forEach(function (event_label){
    promises.push(behavior.initModelParams(algo_type, tag, event_label));
  });
  AV.Promise.all(promises).then(
      function (model_id_list){
        response.success({
          code: 0,
          modelsIdList: model_id_list,
          message: "All Models init successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});

AV.Cloud.define("trainWithSpecificPois", function (request, response) {
  var algo_type   = request.params.algoType,
      tag         = request.params.tag,
      poi_label   = request.params.poiLabel,
      obs         = request.params.obs,
      description = request.params.description;

    var date = new Date();

    poi.trainWithSpecificPois(algo_type, tag, poi_label, obs, description).then(
        function (model_id){
            //console.log(model_id);
            response.success({
                code: 0,
                modelId: model_id,
                message: "Training successfully! at " + date
            });
        },
        function (error){
            response.error({
                code: 1,
                message: error
            });
        }
    );

});

AV.Cloud.define("predictPoi", function (request, response) {
  var algo_type = request.params.algoType,
      tag       = request.params.tag,
      pois      = request.params.seq;

  var date = new Date();
  console.log("fuck!");
  poi.predictPoi(algo_type, tag, pois).then(
      function (prob_list){
        response.success({
          code: 0,
          probabilities: prob_list,
          message: "Predict successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});

AV.Cloud.define("initPoiModelParams", function (request, response) {
  var algo_type = request.params.algoType,
      tag       = request.params.tag;
  var date = new Date();

  poi.initModelParams(algo_type, tag).then(
      function (model_id){
        response.success({
          code: 0,
          modelId: model_id,
          message: "Model init successfully! at " + date
        });
      },
      function (error){
        response.error({
          code: 1,
          message: error
        });
      }
  );
});

module.exports = AV.Cloud;