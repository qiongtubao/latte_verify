import verify from "../verify"
export default function Verify(obj: any) {
    return function (target: any, propertyKey: string, descriptor: any) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return target["_" + propertyKey]
            },
            set: function (value) {
                let v = verify(value, obj);
                target["_" + propertyKey] = v;
            }
        });
    }
}