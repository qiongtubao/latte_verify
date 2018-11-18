import { DataError } from "../errors";
import utils from "../utils"
module NumberType {
  export function parse(object, config) {
    object = object - 0;
    if (isNaN(object)) {
      throw new DataError("number parse error", object);
    }
    return object;
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

export default {
  parse: NumberType.parse,
  verify: NumberType.verify
};