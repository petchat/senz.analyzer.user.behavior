var dao  = require("./dao/dao_model.js");
var util = require("./util.js");
var APP_ENV    = process.env.APP_ENV,
    APP_ID     = process.env.LC_APP_ID,
    APP_KEY    = process.env.LC_APP_KEY,
    MASTER_KEY = process.env.LC_APP_MASTER_KEY;

var _Prob2muti = {
    "test": "http://127.0.0.1:5000/senzlist/prob2muti/",
    "prod": "http://127.0.0.1:5000/senzlist/prob2muti/"
};

var _Algo = {
    "test": {
        GMMHMM: {
            train: {
                "url": "http://api.trysenz.com/test/middleware/userbehavior_event/trainingGMMHMM/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            trainRandomly: {
                "url": "http://api.trysenz.com/test/middleware/userbehavior_event/trainingGMMHMMrandomly/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            classify: {
                "url": "http://api.trysenz.com/test/middleware/userbehavior_event/classifyGMMHMM/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            getModel: dao.getRecentGMMHMM,
            updateModel: dao.updateGMMHMM,
            initModel: dao.initGMMHMM,
            parser: util.parsingBehaviorResult
        },
        GMM: {
            train: {
                "url": "http://api.trysenz.com/test/pois/utils/poi_probability/trainingSpecificPOI/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            classify: {
                "url": "http://api.trysenz.com/test/pois/utils/poi_probability/predictPoi/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            trainRandomly: {
                "url": "",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000155c6497a01cd454e5b3ec9183015cb9a"
                }
            },
            getModel: dao.getRecentGMM,
            updateModel: dao.updateGMM,
            initModel: dao.updateGMM,
            parser: util.parsingPoiResult
        }
    },
    "prod": {
        GMMHMM: {
            train: {
                "url": "http://api.trysenz.com/middleware/userbehavior_event/trainingGMMHMM/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
            trainRandomly: {
                "url": "http://api.trysenz.com/middleware/userbehavior_event/trainingGMMHMMrandomly/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
            classify: {
                "url": "http://api.trysenz.com/middleware/userbehavior_event/classifyGMMHMM/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
            getModel: dao.getRecentGMMHMM,
            updateModel: dao.updateGMMHMM,
            initModel: dao.initGMMHMM,
            parser: util.parsingBehaviorResult
        },
        GMM: {
            train: {
                "url": "http://api.trysenz.com/pois/utils/poi_probability/trainingSpecificPOI/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
            classify: {
                "url": "http://api.trysenz.com/pois/utils/poi_probability/predictPoi/",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
            trainRandomly: {
                "url": "",
                "headers": {
                    "X-senz-Auth": "5548eb2ade57fc001b00000109e8a3cfc1bc4dfd53d994ad23ef0da8"
                }
            },
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
exports.APP_ID = APP_ID;

exports.APP_KEY = APP_KEY;

exports.MASTER_KEY = MASTER_KEY;

exports.APP_ENV = APP_ENV;

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
