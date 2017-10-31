import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { KeyValue } from '../../models/catalog/key-value';
import { AppService } from '../app-service';

@Injectable()
export class ProductAttributeGroupService extends AppService {
  constructor(http: Http, private httpNew: Http) {
    super(http);
    this.BASE_END_POINT = "api/product-attribute-group"
  }

  getGroups() {
    return this.httpNew.get(this.BASE_END_POINT + "/groups").map(x => x.json());
  }

}
