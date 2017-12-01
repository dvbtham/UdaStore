import { TestBed, inject } from '@angular/core/testing';

import { AppSettingService } from './app-setting.service';

describe('AppSettingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppSettingService]
    });
  });

  it('should be created', inject([AppSettingService], (service: AppSettingService) => {
    expect(service).toBeTruthy();
  }));
});
