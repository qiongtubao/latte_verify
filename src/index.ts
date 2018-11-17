
import latte_lib from "latte_lib"
let whatIs = latte_lib.getClassName;
import stringType from "./types/string"
import booleanType from "./types/boolean"
import dateType from "./types/date"
import functionType from "./types/function"
import integerType from "./types/integer"
import nullType from "./types/null"
import numberType from "./types/number"
import objectType from "./types/object"
import arrayType from "./types/array"
import { DataError, ConfigError } from "./errors/index"
let handles = {
  "string": stringType,
  "boolean": booleanType,
  "date": dateType,
  "function": functionType,
  "integer": integerType,
  "null": nullType,
  "number": numberType,
  "object": objectType,
  "array": arrayType
};



let verify = (data, config): any => {

  if (data == null) {
    if (config.default != null) {
      return config.default;
    }
    if (config.must == true) {
      //throw new Error("config must value")
      throw config.error || new DataError("config must value")
    } else if (latte_lib.isObject(config.must) && config.must.value == true) {
      throw config.must.error || config.error || new DataError("config must value");
    }
    return data;
  }
  if (!config.type) {
    throw new ConfigError("config root not type");
  }
  var handle;
  switch (whatIs(config.type)) {
    case "object":
      if (!config.type.value) {
        throw config.type.error || new ConfigError("config type ")
      }
      handle = handles[config.type.value];

      break;
    case "string":

      handle = handles[config.type];

      break;
    default:

      throw config.type.error || config.error || new ConfigError("config root type error");
  }


  if (!handle) {
    throw new ConfigError("verify not have type ", config);
  }
  try {

    data = handle.parse(data, config);
    data = handle.verify(data, config);

  } catch (error) {
    if (error.constructor == DataError) {
      throw config.error || error;
    } else {

      throw error;
    }

  }
  return data;
}
export default {
  verify,
}
interface VerifyClass {
  verify(data: any): any;
}
let createVerifyClass = function (option: any): VerifyClass {
  return class {
    static verify(data: any): any {
      return verify(data, option);
    }
  }
}
export {
  VerifyClass,
  createVerifyClass
}