import { Injectable } from '@angular/core';
import { AppService } from '../app-service';
import { Http, Headers } from '@angular/http';
import { Category } from '../../models/catalog/category';

@Injectable()
export class CategoryService extends AppService {

  constructor(http: Http, private localHttp: Http) {
    super(http);
    this.BASE_END_POINT = "/api/categories";
  }

  uploadPhoto(id: number, file: any) {
    let formData = new FormData();
    formData.append('file', file);
    return this.localHttp.post(this.BASE_END_POINT + "/" + id + "/photo", formData, { headers: this.header }).map(result => result.json());
  }

  getCategories() {
    return this.localHttp.get(this.BASE_END_POINT + "/data", { headers: this.header }).map(x => x.json());
  }

}
