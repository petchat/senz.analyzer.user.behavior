/**
 * Created by MeoWoodie on 6/2/15.
 */

//exports.trainWithPois = function (algo_type, tag){
//    var Model = new m.Model(algo_type, tag, "poi");
//    return Model.configuration().then(
//        function (){
//            if (obs != undefined) {
//                //logger.info(config.logEventType.u2e, "Observation is correct. Start to train.");
//                return Model.train(obs, 10);
//            }
//            else{
//                //logger.error(config.logEventType.u2e, "Observation is incorrect. Failed to train.");
//                return AV.Promise.error("Obs is undefined.");
//            }
//        },
//        function (error){
//            //logger.error(config.logEventType.u2e, "Configuration is incorrect. Failed to train.");
//            return AV.Promise.error(error);
//        }
//    ).then(
//        function (model){
//            if (description != undefined){
//                //logger.info(config.logEventType.upd, "Training is over. Updating model to database.");
//                return Model.updateModel(description);
//            }
//            else{
//                return AV.Promise.as(model);
//            }
//        },
//        function (error){
//            //logger.error(config.logEventType.u2e, "Training is over. But updating model failed.");
//            return AV.Promise.error(error);
//        }
//    );
//};

