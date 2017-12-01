import { Component, OnInit } from '@angular/core';
import { AppSetting } from '../../../models/core/app-setting';
import { AppSettingService } from '../../../services/core/app-setting.service';
import { ToastyService } from 'ng2-toasty';
import { SaveSuccessMessage } from '../../../services/app-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.component.html',
  styleUrls: ['./appsetting.component.css']
})
export class AppsettingComponent {
  settings: AppSetting[] = [];
  constructor(private settingService: AppSettingService,
    private toastyService: ToastyService, private router: Router) {
    this.settingService.getAll().subscribe(settings => this.settings = settings);
  }

  save(isGoToNext: boolean) {
    this.settingService.updateWithoutId(this.settings).subscribe(() => {
      this.toastyService.success(SaveSuccessMessage);
      if (isGoToNext) this.router.navigate(['/home']);
    });
  }

}
