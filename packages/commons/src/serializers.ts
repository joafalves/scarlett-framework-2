//const serialized = new WeakMap();

import { TypedJSON } from "typedjson";

//let Serializer: any;

//@ts-ignore
// eslint-disable-next-line
interface ParameterlessConstructor<T> {
  //eslint-disable-next-line
  new (): T;
}

export class Helper {
  static restoreFromJson<T>(data: object, target: ParameterlessConstructor<T>): T | undefined {
    const result = TypedJSON.parse(data, target);
    console.log("parsed: ", result);
    return result;
  }
}

export function serializable(): ClassDecorator {
  return function(target: Function) {
    target.prototype.toJSON = function() {
      //Serializer = new TypedJSON(target.prototype.constructor);

      const result = TypedJSON.toPlainJson(this, target.prototype.constructor);

      //const result = Serializer.stringify(this);

      console.log("result: ", result);

      return result;
    };

    target.prototype.restoreFromJson = function(data: any) {
      const result = TypedJSON.parse(data, target.prototype.constructor);
      console.log("parsed: ", result);
      Object.assign(this, result);
    };

    /** 
    target.prototype.toJSON = function() {
      const map: any = serialized.get(target.prototype);
      console.log(map);
      const props: Array<string> = Object.keys(map);
      console.log(props);
      return props.reduce((previous, key) => {
        console.log("previous", previous);
        console.log("key", key);
        console.log("map key", map[key]);
        console.log("this key", this[key]);
        // @ts-ignore
        previous[map[key]] = this[key];
        return previous;
      }, {});
    };
    **/

    /** 
    target.prototype.restore = function(data: object) {
      const map: any = serialized.get(target.prototype);
      const props: Array<string> = Object.keys(map);

      const dataKeys = Object.keys(data);

      let result = {};

      console.log(map);
    };
    **/
  };
}

/** 
export function serialize(name?: string): PropertyDecorator {
  return function(target: Object, propertyKey: string | symbol) {
    let map = serialized.get(target);
    if (!map) {
      map = {};
      serialized.set(target, map);
    }

    map[propertyKey] = name || propertyKey;
  };
**/
