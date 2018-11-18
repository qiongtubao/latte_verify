import latte_lib from "latte_lib"
import { DataError } from "../errors";
import utils from "../utils"
module IntegerType {
  export function parse(object, config) {
    let data = parseInt(object);
    if (isNaN(data)) {
      throw new DataError("data type Error", object);
    }
    return data;
  }
  export function verify(object, config) {
    if (config.max) {
      utils.than(config.max, object, (v, data) => {
        if (data > v) {
          throw new DataError("data max error", object);
        }
      })
    }
    if (config.min) {
      utils.than(config.min, object, (v, data) => {
        if (data < v) {
          throw new DataError("data min error", object);
        }
      });
    }
    if (config.match) {
      utils.than(config.match, object, (v, data) => {
        if (!v(data)) {
          throw new DataError("data match error");
        }
      });
    }
    return object;
  }
}

export default IntegerType;