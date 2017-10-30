import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Brand } from '../../models/catalog/brand';

@Injectable()
export class BrandService {
  private readonly BASE_END_POINT = '/api/brands';
  constructor(private http: Http) { }

  getAll() {
    return this.http.get(this.BASE_END_POINT).map(brands => brands.json());
  }

  create(brand: any) {
    return this.http.post(this.BASE_END_POINT, brand).map(brand => brand.json());
  }
  getBrand(id: number) {
    return this.http.get(`${this.BASE_END_POINT}/${id}`).map(brand => brand.json());
  }

  update(id: number, brand: Brand) {
    return this.http.put(`${this.BASE_END_POINT}/${id}`, brand).map(brand => brand.json());
  }

  delete(id: number){
    return this.http.delete(this.BASE_END_POINT + "/"+ id).map(brand => brand.json());
  }

}
