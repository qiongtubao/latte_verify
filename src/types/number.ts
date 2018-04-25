import { DataError } from "../errors";

module NumberType {
  export function parse(object) {
    object = object - 0;
    if (isNaN(object)) {
      throw new DataError("number parse error", object);
    }
    return object;
  }
}

export default {
  parse: NumberType.parse,
  verify: NumberType.parse
};