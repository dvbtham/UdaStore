import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { KeyValue } from '../../models/catalog/key-value';
import { AppService } from '../app-service';

@Injectable()
export class ProductOptionsService extends AppService {
  constructor(http: Http) {
    super(http);
    this.BASE_END_POINT = "api/product-options"
  }
}
