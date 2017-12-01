import { Injectable } from '@angular/core';
import { AppService } from '../app-service';
import { Http } from '@angular/http';
import { AppSetting } from '../../models/core/app-setting';

@Injectable()
export class AppSettingService extends AppService{

  constructor(http: Http,private newHttp: Http) {
    super(http);
    this.BASE_END_POINT = "/api/appsetting";
   }

   updateWithoutId(appSetting: AppSetting[]) {
    return this.newHttp.put(this.BASE_END_POINT, appSetting).map(result => result.json());
}

}
