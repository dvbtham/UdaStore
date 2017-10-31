import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTemplatesFormComponent } from './product-templates-form.component';

describe('ProductTemplatesFormComponent', () => {
  let component: ProductTemplatesFormComponent;
  let fixture: ComponentFixture<ProductTemplatesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTemplatesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTemplatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
