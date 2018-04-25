import latte_lib from "latte_lib";
import { ConfigError } from "./errors/index"
var whatIs = latte_lib.getClassName;
function objectThan(config, data, thanFunc, configParse?) {
  if (config.value) {
    if (configParse) { config.value = configParse(config.value); }
    try {
      thanFunc(config.value, data);
    } catch (err) {
      throw config.error || err;
    }
  } else {
    if (configParse) { config = configParse(config); };
    thanFunc(config, data);
  }
}
function than(config, data, thanFunc, configParse?) {
  switch (whatIs(config)) {
    case "object":
      if (!config.value) {
        throw new ConfigError("config attr is object but it has not value");
      }
      if (configParse) { config.value = configParse(config.value); }
      try {
        thanFunc(config.value, data);
      } catch (err) {
        throw config.error || err;
      }

      break;
    default:
      if (configParse) { config = configParse(config); };
      thanFunc(config, data);
      break;
  }
}

export default {
  than,
  objectThan
}