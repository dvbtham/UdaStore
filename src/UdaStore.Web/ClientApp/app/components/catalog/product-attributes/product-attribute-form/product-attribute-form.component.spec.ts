import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAttributeFormComponent } from './product-attribute-form.component';

describe('ProductAttributeFormComponent', () => {
  let component: ProductAttributeFormComponent;
  let fixture: ComponentFixture<ProductAttributeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductAttributeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductAttributeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
