import { KeyValue } from "./key-value";
import { ProductAttributes } from "./product-attributes";

export class ProductTemplateSave extends KeyValue {
    attributes: ProductAttributes[] = [];
}