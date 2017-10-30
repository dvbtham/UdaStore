import { TestBed, inject } from '@angular/core/testing';

import { ProductAttributesService } from './product-attributes.service';

describe('ProductAttributesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAttributesService]
    });
  });

  it('should be created', inject([ProductAttributesService], (service: ProductAttributesService) => {
    expect(service).toBeTruthy();
  }));
});
