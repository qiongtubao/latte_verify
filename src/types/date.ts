import { DataError, ConfigError } from "../errors/index"
import utils from "../utils"
module DateType {
  let toDate = (object) => {
    let date = new Date(object);
    if (isNaN(date.getTime())) {
      return null;
    }
    return date;
  }
  export function parse(object, config) {
    let date = toDate(object);
    if (!date) {
      throw new DataError("date data error", object);
    }
    return date;
  }
  export function verify(object, config) {
    if (config.min) {
      utils.than(config.min, object, function (minDate, data) {
        if (!minDate) {
          throw new ConfigError("date min config error", config);
        }
        if (data.getTime() < minDate.getTime()) {
          throw new DataError("date min config error", data);
        }
      }, function (v) {
        return toDate(v);
      });

    }
    if (config.max) {
      utils.than(config.max, object, function (maxDate, data) {
        if (!maxDate) {
          throw new ConfigError("date max config error", config);
        }
        if (data.getTime() > maxDate.getTime()) {
          throw new DataError("date max config error", data);
        }
      }, function (v) {
        return toDate(v);
      });

    }
    return object;
  }
}
export default DateType;