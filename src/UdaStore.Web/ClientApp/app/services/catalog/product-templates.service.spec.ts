import { TestBed, inject } from '@angular/core/testing';

import { ProductTemplatesService } from './product-templates.service';

describe('ProductTemplatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductTemplatesService]
    });
  });

  it('should be created', inject([ProductTemplatesService], (service: ProductTemplatesService) => {
    expect(service).toBeTruthy();
  }));
});
