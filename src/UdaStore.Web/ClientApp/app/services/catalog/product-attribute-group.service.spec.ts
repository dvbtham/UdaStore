import { TestBed, inject } from '@angular/core/testing';

import { ProductAttributeGroupService } from './product-attribute-group.service';

describe('ProductAttributeGroupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductAttributeGroupService]
    });
  });

  it('should be created', inject([ProductAttributeGroupService], (service: ProductAttributeGroupService) => {
    expect(service).toBeTruthy();
  }));
});
