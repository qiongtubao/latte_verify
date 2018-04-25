import { DataError } from "../errors";
import utils from "../utils";
module BooleanType {
  export function parse(data) {
    if (data == true || data == "true") {
      return true;
    }
    if (data == false || data == "false") {
      return false;
    }
    throw new DataError("boolean parse error");
  }
  export function verify(data, config) {
    if (config.equal) {
      utils.than(config.equal, data, (v, data) => {
        if (v != data) {
          throw new DataError("boolean equal error", data);
        }
      });
    }
  }
}
export default BooleanType;