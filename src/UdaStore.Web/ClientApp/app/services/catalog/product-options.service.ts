import { Injectable } from '@angular/core';
import { ProductOptions } from '../../models/catalog/product-options';
import { Http } from '@angular/http';

@Injectable()
export class ProductOptionsService {

  private readonly BASE_END_POINT = '/api/product-options';
  constructor(private http: Http) { }

  create(body: ProductOptions) {
    return this.http.post(this.BASE_END_POINT, body).map(res => res.json());
  }

  update(id: number, body: ProductOptions) {
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
