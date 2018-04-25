
import latte_lib from "latte_lib";
let whatIs = latte_lib.getClassName;
import { DataError } from "../errors";
import utils from "../utils";

module StringType {

  export function parse(object) {
    switch (whatIs(object)) {
      case "object":
        return JSON.stringify(object);
      case "string":
        return object;
      default:
        return object.toString();
    }
  }
  export function verify(data, config) {
    if (config.maxLength) {
      utils.than(config.maxLength, data, function (v, data) {
        if (data.length > v) {
          throw new DataError("string maxLength Error", data);
        }
      });


    }
    if (config.minLength) {
      utils.than(config.minLength, data, function (v, data) {
        if (data.length < v) {
          throw new DataError("string minLength Error", data);
        }
      })

    }

    if (config.in) {
      utils.than(config.in, data, function (v, data) {
        if (v.indexOf(data) == -1) {
          throw new DataError("string in Error", data);
        }
      });

    }
    if (config.regex) {
      utils.than(config.regex, data, function (v, data) {
        let regex = new RegExp(v, "img");
        if (!regex.exec(data)) {
          throw new DataError("string regex Error", data);
        }
      });

    }
    if (config.match) {
      utils.than(config.match, data, function (v, data) {
        if (!v(data)) {
          throw new DataError("string match error", data);
        }
      });

    }
    return data;
  }
}


export default StringType;