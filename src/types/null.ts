import { DataError } from "../errors";

module NUllType {
  export function parse(object) {
    if (object != null && object != "null") {
      throw new DataError("null parse error", object);
    }
    return undefined;
  }
}
export default {
  parse: NUllType.parse,
  verify: NUllType.parse
};