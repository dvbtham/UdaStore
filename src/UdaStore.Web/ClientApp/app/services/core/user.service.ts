import { Injectable } from '@angular/core';
import { AppService } from '../app-service';
import { Http } from '@angular/http';

@Injectable()
export class UserService extends AppService{

  constructor(http: Http) {
    super(http);
    this.BASE_END_POINT = "/api/users"
   }

}