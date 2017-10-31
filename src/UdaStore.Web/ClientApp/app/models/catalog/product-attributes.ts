import { KeyValue } from "./key-value";

export class ProductAttributesSave extends KeyValue {
    groupId: number;
}

export class ProductAttributes extends KeyValue {
    attributeId: number;
    value: string;
    groupName: string;
}

export class ProductAttributeGroup {
    name: string;
    attributes: ProductAttributes[] = [];
}