import latte_lib from "latte_lib"
let whatIs = latte_lib.getClassName;
import { DataError } from "../errors"
import utils from "../utils"

module ArrayType {
  export function parse(object: any, config: any) {

    switch (whatIs(object)) {
      case "array":
        return object;
      case "string":
        let parseData;
        try {
          parseData = JSON.parse(object);
        } catch (err) {
          parseData = object;
        }
        if (!latte_lib.isArray(parseData)) {
          if (config.force) {
            return [parseData];
          } else {
            throw new DataError("array parse error", object);
          }
        } else {
          return parseData;
        }
      default:
        if (config.force) {
          return [object];
        } else {
          throw new DataError("array parse error", object);
        }
    }
  }

  export function verify(data, config) {
    if (config.maxLength) {
      utils.than(config.maxLength, data, (v, data) => {
        if (data.length > v) {
          throw new DataError("array maxLength error", data);
        }
      });
    }
    if (config.minLength) {
      utils.than(config.minLength, data, (v, data) => {
        if (data.length < v) {
          throw new DataError("array minLength error", data);
        }
      });
    }
    if (config.properties) {
      utils.objectThan(config.properties, data, (v, object) => {
        for (let key in v) {
          let childConfig = v[key];
          try {
            let data = require("../index").default.verify(object[key], childConfig, 1);
            object[key] = data;
          } catch (error) {
            throw childConfig.error || error;
          }
        }
      });
    }
    if (config.all) {
      utils.than(config.all, data, (v, object) => {
        for (let i = 0, len = object.length; i < len; i++) {
          let index = v.indexOf(object[i]);
          if (index == -1) {
            throw new DataError("array all error", data, config);
          }
        }
      })
    }
    if (config.match) {
      utils.than(config.match, data, (v, object) => {
        for (let i = 0, len = object.length; i < len; i++) {
          let result = v(object[i]);
          if (!result) {
            throw new DataError("array match error", data);
          }
        }
      });
    }
    return data;
  }
}
export default ArrayType;