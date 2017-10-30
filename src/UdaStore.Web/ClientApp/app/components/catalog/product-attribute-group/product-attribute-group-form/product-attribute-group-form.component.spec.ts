import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeGroupFormComponent } from './product-attribute-group-form.component';

describe('ProductAttributeGroupFormComponent', () => {
  let component: ProductAttributeGroupFormComponent;
  let fixture: ComponentFixture<ProductAttributeGroupFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttributeGroupFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeGroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
