import { KeyValue } from "./key-value";
import { ProductMedia } from "./product-media";
import { ProductOption } from "./product-option";
import { ProductAttributes } from "./product-attributes";

export class ProductForm {
    product: Product = new Product();
    productImages: any[] = [];
    productDocuments: any[] = [];
}

export class ProductVariation extends KeyValue {
    normalizedName: string;
    price: number;
    oldPrice: number;
    optionCombinations: ProductOptionCombination[] = [];
}

export class ProductOptionCombination  {
    optionId: number;
    optionName: string;
    value: string;
    sortIndex: number;
}

export class Product extends KeyValue {
    constructor(){
        super();
        this.isPublished = true;
        this.isCallForPricing = false;
        this.isAllowToOrder = true;
        this.isOutOfStock = false;
        this.price = 0;
        this.thumbnailImageUrl = "/uploads/no-image.png";
    }
    price: number;
    oldPrice: number;
    brandId: number;
    specialPrice: number;
    specialPriceStart: string;
    specialPriceEnd: string;
    isCallForPricing: boolean;
    stockQuantity: number;
    isAllowToOrder: boolean;
    isOutOfStock: boolean;
    shortDescription: string;
    description: string;
    specification: string;
    isPublished: boolean;
    isFeatured: boolean;
    categoryIds: number[] = [];
    attributes: ProductAttributes[] = [];
    options: ProductOption [] = [];
    variations: ProductVariation [] = [];
    thumbnailImageUrl: string;
    productImages: ProductMedia[] = [];
    productDocuments: ProductMedia[] = [];
    deletedMediaIds: number[] = [];
    relatedProducts: KeyValue [] = [];
}