import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ProductAttributeGroup } from '../../models/catalog/product-attribute-group';

@Injectable()
export class ProductAttributeGroupService {
  private readonly BASE_END_POINT = '/api/product-attribute-group';
  constructor(private http: Http) { }

  create(body: ProductAttributeGroup) {
    return this.http.post(this.BASE_END_POINT, body).map(res => res.json());
  }

  update(id: number, body: ProductAttributeGroup) {
    return this.http.put(this.BASE_END_POINT + "/" + id, body).map(res => res.json());
  }

  delete(id: number) {
    return this.http.delete(this.BASE_END_POINT + "/" + id).map(res => res.json());
  }

  getAll() {
    return this.http.get(this.BASE_END_POINT).map(res => res.json());
  }

  get(id: number) {
    return this.http.get(this.BASE_END_POINT + "/" + id, ).map(res => res.json());
  }

}
