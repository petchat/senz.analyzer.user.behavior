var dao  = require("./dao/dao_model.js");
var util = require("./util.js");
var APP_ENV = process.env.APP_ENV;

var _Prob2muti = {
    "test": "http://127.0.0.1:5000/senzlist/prob2muti/",
    "prod": "http://127.0.0.1:5000/senzlist/prob2muti/"
};

var _Algo = {
    "test": {
        GMMHMM: {
            //train: "http://120.27.30.239:9047/trainingGMMHMM/",
            train: "http://127.0.0.1:9010/trainingGMMHMM/",
            trainRandomly: "http://120.27.30.239:9047/trainingGMMHMMrandomly/",
            //classify: "http://120.27.30.239:9047/classifyGMMHMM/",
            classify: "http://127.0.0.1:9010/classifyGMMHMM/",
            getModel: dao.getRecentGMMHMM,
            updateModel: dao.updateGMMHMM,
            initModel: dao.initGMMHMM,
            parser: util.parsingBehaviorResult
        },
        GMM: {
            //train: "http://senz-dev-senz-middleware-poi-poiprob.daoapp.io/trainingSpecificPOI/",
            train: "http://127.0.0.1:9010/trainingSpecificPOI/",
            //classify: "http://senz-dev-senz-middleware-poi-poiprob.daoapp.io/predictPoi/",
            classify: "http://127.0.0.1:9010/predictPoi/",
            trainRandomly: "",
            getModel: dao.getRecentGMM,
            updateModel: dao.updateGMM,
            initModel: dao.updateGMM,
            parser: util.parsingPoiResult
        }
    },
    "prod": {
        GMMHMM: {
            //train: "http://120.27.30.239:9047/trainingGMMHMM/",
            train: "http://127.0.0.1:9010/trainingGMMHMM/",
            trainRandomly: "http://120.27.30.239:9047/trainingGMMHMMrandomly/",
            //classify: "http://120.27.30.239:9047/classifyGMMHMM/",
            classify: "http://127.0.0.1:9010/classifyGMMHMM/",
            getModel: dao.getRecentGMMHMM,
            updateModel: dao.updateGMMHMM,
            initModel: dao.initGMMHMM,
            parser: util.parsingBehaviorResult
        },
        GMM: {
            //train: "http://senz-dev-senz-middleware-poi-poiprob.daoapp.io/trainingSpecificPOI/",
            train: "http://127.0.0.1:9010/trainingSpecificPOI/",
            //classify: "http://senz-dev-senz-middleware-poi-poiprob.daoapp.io/predictPoi/",
            classify: "http://127.0.0.1:9010/predictPoi/",
            trainRandomly: "",
            getModel: dao.getRecentGMM,
            updateModel: dao.updateGMM,
            initModel: dao.updateGMM,
            parser: util.parsingPoiResult
        }
    }
};

var _logentries_token = {
    "test": "399fd3dd-7da7-402a-a7a6-4707a2225e6d",
    "prod": "c45062a1-5926-47de-9c45-e76d64ebcb54"
};

// ---- Environment Configuration ----

exports.Algo = _Algo[APP_ENV];

exports.logentries_token = _logentries_token[APP_ENV];

exports.Prob2muti = _Prob2muti[APP_ENV];

// ---- Basic Configuration ----

exports.BehaviorInitParams = {
    GMMHMM: {
        "dining.chineseRestaurant": {
            nComponent: 4,
            hmmParams: {
                startProb: [0.4, 0.3, 0.1, 0.2],
                transMat: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ],
                startProbPrior: [0.4, 0.3, 0.1, 0.2],
                transMatPrior: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ]
            },
            gmmParams: {
                nMix: 4,
                covarianceType: "full"
            }
        },
        "fitness.running": {
            nComponent: 4,
            hmmParams: {
                startProb: [0.4, 0.3, 0.1, 0.2],
                transMat: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ],
                startProbPrior: [0.4, 0.3, 0.1, 0.2],
                transMatPrior: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ]
            },
            gmmParams: {
                nMix: 4,
                covarianceType: "full"
            }
        },
        "work.office": {
            nComponent: 4,
            hmmParams: {
                startProb: [0.4, 0.3, 0.1, 0.2],
                transMat: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ],
                startProbPrior: [0.4, 0.3, 0.1, 0.2],
                transMatPrior: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ]
            },
            gmmParams: {
                nMix: 4,
                covarianceType: "full"
            }
        },
        "shopping.mall": {
            nComponent: 4,
            hmmParams: {
                startProb: [0.4, 0.3, 0.1, 0.2],
                transMat: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ],
                startProbPrior: [0.4, 0.3, 0.1, 0.2],
                transMatPrior: [
                    [0.2, 0.1, 0.3, 0.4],
                    [0.3, 0.2, 0.2, 0.3],
                    [0.1, 0.1, 0.1, 0.7],
                    [0.1, 0.3, 0.4, 0.2]
                ]
            },
            gmmParams: {
                nMix: 4,
                covarianceType: "full"
            }
        }
    }
};

exports.PoisInitParams = {
    GMM: {
        nMix: 4,
        covarianceType: "full",
        params: {
            nMix: 4,
            covarianceType: "full"
        }
    }
};

exports.logEventType = {
    sta: "Start",
    ret: "Retrieving",
    sav: "Saving",
    upd: "Updating",
    r2s: "Middleware.Log.RawSenz",
    r2r: "Middleware.RawSenz.RefinedSenz",
    p2m: "Middleware.ProbSenz.MultiSenz",
    u2e: "Middleware.userbehavior.event"
};

console.log("Current APP_ENV is:" + APP_ENV);
console.log("Current Logentries token is:" + _logentries_token[APP_ENV]);
console.log("Current prob2multi url is:" + _Prob2muti[APP_ENV]);
console.log("Current Model info is:" + JSON.stringify(_Algo[APP_ENV]));
