import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ProductAttributesSave } from '../../models/catalog/product-attributes';
import { AppService } from '../app-service';

@Injectable()
export class ProductAttributesService extends AppService {

  constructor(http: Http) {
    super(http);
    this.BASE_END_POINT = "api/product-attributes"
  }

}
