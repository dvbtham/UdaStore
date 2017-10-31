import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AppService } from '../app-service';

@Injectable()
export class ProductTemplatesService extends AppService{
  constructor(http: Http) {
    super(http);
    this.BASE_END_POINT = "api/product-templates"
  }
}
