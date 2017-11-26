import { KeyValue } from "./key-value";
export class Serializable {
    fillFromJSON(json: string) {
        var jsonObj = JSON.parse(json);
        for (var propName in jsonObj) {
            this[propName] = jsonObj[propName]
        }
    }
}
export class ProductOption extends Serializable {
    id: number;
    name: number;
    values: string[] = [];
}

