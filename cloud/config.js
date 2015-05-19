var dao = require("cloud/dao/dao_model.js");

exports.Prob2muti = "http://127.0.0.1:5000/senzlist/prob2muti/";

exports.Algo = {
    GMMHMM: {
        train: "http://127.0.0.1:9010/trainingGMMHMM/",
        trainRandomly: "http://127.0.0.1:9010/trainingGMMHMMrandomly/",
        classify: "http://127.0.0.1:9010/classifyGMMHMM/",
        getModel: dao.getRecentGMMHMM,
        updateModel: dao.updateGMMHMM
    }
};