/**
 * Created by MeoWoodie on 5/14/15.
 */

// Return every config item(A specific type infomation)'s processing result,
// according to which type of config you want to know.
var processConfigItem = function (config_item_value, config_type){
    for (key in config_item_value){
        if (key == "isActive" && config_type == "isActive") {
            return config_item_value[key];
        }
        // TODO: Following are other config type's processing.
    }
};

// Replace '#' to '.'
var processConfigContent = function (config_content){
    if (typeof(config_content) == "string"){
        return config_content.replace("#", ".");
    }
    // TODO: Following are other config contents' processing.
    else{
        return undefined;
    }
};

// Process Configuration.
exports.processConfig = function (config_names, config_values){
    // Get useful config from config values.
    var config_processed = {};
    for (i in config_names){
        // i is index of name of config.
        // Processing the i'th config value
        var config_value_result = [];

        // - Event Probability Map Config...
        if (config_names[i] == "event_prob_map"){
            var processedContentValue = {};
            for (var key in config_values[i]){
                processedContentValue[processConfigContent(key)] = config_values[i][key];
            }
            config_value_result = processedContentValue;
        }
        // ...
        // - Other conditions put here...
        // ...
        // - Normal config...
        else {
            for (var key in config_values[i]) {
                // key is name of every type info's name
                // Check isActive configuration.
                if (processConfigItem(config_values[i][key], "isActive")) {
                    // Replace '#' to '.'
                    config_value_result.push(processConfigContent(key));
                }
            }
        }
        //console.log(config_value_result);
        config_processed[config_names[i]] = config_value_result;
    }
    return config_processed;
};

// Check model's config
exports.checkModelConfig = function (model_config, config){
    //console.log(model_config);
    //console.log(config);
    return true;
};