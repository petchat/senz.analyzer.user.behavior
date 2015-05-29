var dao = require("cloud/dao/dao_model.js");

exports.Prob2muti = "http://127.0.0.1:5000/senzlist/prob2muti/";

exports.InitParams = {
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

exports.Algo = {
    GMMHMM: {
        train: "http://120.27.30.239:9047/trainingGMMHMM/",
        //train: "http://127.0.0.1:9010/trainingGMMHMM/",
        trainRandomly: "http://120.27.30.239:9047/trainingGMMHMMrandomly/",
        classify: "http://120.27.30.239:9047/classifyGMMHMM/",
        //classify: "http://127.0.0.1:9010/classifyGMMHMM/",
        getModel: dao.getRecentGMMHMM,
        updateModel: dao.updateGMMHMM,
        initModel: dao.initGMMHMM
    }
};

exports.logEventType = {
    "sta": "Start",
    "ret": "Retrieving",
    "sav": "Saving",
    "upd": "Updating",
    "r2s": "Middleware.Log.RawSenz",
    "r2r": "Middleware.RawSenz.RefinedSenz",
    "p2m": "Middleware.ProbSenz.MultiSenz",
    "u2e": "Middleware.userbehavior.event"
};