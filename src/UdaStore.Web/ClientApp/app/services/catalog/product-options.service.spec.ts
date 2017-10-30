import { TestBed, inject } from '@angular/core/testing';

import { ProductOptionsService } from './product-options.service';

describe('ProductOptionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductOptionsService]
    });
  });

  it('should be created', inject([ProductOptionsService], (service: ProductOptionsService) => {
    expect(service).toBeTruthy();
  }));
});
