import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Brand } from '../../models/catalog/brand';
import { AppService } from '../app-service';

@Injectable()
export class BrandService extends AppService {
  constructor(http: Http) {
    super(http);
    this.BASE_END_POINT = "api/brands"
  }
}
