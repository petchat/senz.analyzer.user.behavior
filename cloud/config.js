var dao = require("cloud/dao/dao_model.js");

exports.Prob2muti = "http://127.0.0.1:5000/senzlist/prob2muti/";

exports.Algo = {
    GMMHMM: {
        train: "http://120.27.30.239:9047/trainingGMMHMM/",
        trainRandomly: "http://120.27.30.239:9047/trainingGMMHMMrandomly/",
        classify: "http://120.27.30.239:9047/classifyGMMHMM/",
        getModel: dao.getRecentGMMHMM,
        updateModel: dao.updateGMMHMM
    }
};