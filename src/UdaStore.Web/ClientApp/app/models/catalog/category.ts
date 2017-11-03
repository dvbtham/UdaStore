import { KeyValue } from "./key-value";

export class Category extends KeyValue {
    displayOrder: number;
    parentId: number;
    pinToMenu: boolean;
    description: string;
    isPublished: boolean;
    thumbnailImage: any;
    thumbnailImageUrl: string;
}