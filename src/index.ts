

import verify from "./verify"
import VerifyDecorator from "./decorator/verify"




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
  createVerifyClass,
  VerifyDecorator
}