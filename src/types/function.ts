import { DataError } from "../errors/index"
import latte_lib from "latte_lib"
let whatIs = latte_lib.getClassName;

module FunctionType {
  export function parse(object, config) {
    if (whatIs(object) !== "function") {
      throw new DataError("data type error");
    }
    return object;
  }
}

export default {
  verify: FunctionType.parse,
  parse: FunctionType.parse
};