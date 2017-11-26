import { Injectable } from '@angular/core';
import { AppService } from '../app-service';
import { Http } from '@angular/http';
import { ProductForm } from '../../models/catalog/product';

@Injectable()
export class ProductService extends AppService {

  constructor(http: Http, private newHttp: Http) {
    super(http);
    this.BASE_END_POINT = "/api/products";
  }

  updateWithFile(id: number, entity: any, file: any) {
    var formData = new FormData();

    formData.append('file', file);
    for (var i = 0; i < entity.productImages.length; i++)
    {
        formData.append('productImages', entity.productImages[i], entity.productImages[i].name);
    }
    for (var i = 0; i < entity.productDocuments.length; i++)
    {
        formData.append('productDocuments', entity.productDocuments[i], entity.productDocuments[i].name);
    }
    
    this.emptyFiles(entity);
    formData.append('resource', JSON.stringify(entity));

    return this.newHttp.put(`${this.BASE_END_POINT}/${id}`, formData).map(result => result.json());
  }

  updateIdOnly(id) {
    return this.newHttp.get(`${this.BASE_END_POINT}/${id}/idOnly`).map(result => console.log("success"));
  }

  emptyFiles(productForm: ProductForm) {
    productForm.productImages = [];
    productForm.productDocuments = [];
  }

  createWithFile(entity: ProductForm, file: any) {
    var formData = new FormData();
    formData.append('resource', JSON.stringify(entity));
    formData.append('file', file)
    console.log(JSON.stringify(entity));
    return this.newHttp.post(this.BASE_END_POINT, formData).map(res => res.json());
  }
}
