
import latte_lib from "latte_lib"
import { DataError } from "../errors";
let whatIs = latte_lib.getClassName;
import utils from "../utils";

module ObjectType {
  export function parse(object, config) {
    switch (whatIs(object)) {
      case "string":
        try {
          return JSON.parse(object);
        } catch (err) {
          throw new DataError("object data error", object);
        }
      case "object":
        return object;
      default:
        throw new DataError("object data error", object);
    }
  }

  export function verify(object, config) {
    if (config.properties) {
      utils.objectThan(config.properties, object, (v, data) => {
        for (let key in v) {
          let childConfig = v[key];
          try {
            let verify = require("../index").default;
            let o = verify.verify(data[key], childConfig, 1);
            data[key] = o;
          } catch (error) {
            throw error;
          }
        }
      })
    }
    return object;
  }
}
export default ObjectType;