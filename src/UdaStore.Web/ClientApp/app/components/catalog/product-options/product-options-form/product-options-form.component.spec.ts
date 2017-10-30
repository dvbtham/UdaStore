import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOptionsFormComponent } from './product-options-form.component';

describe('ProductOptionsFormComponent', () => {
  let component: ProductOptionsFormComponent;
  let fixture: ComponentFixture<ProductOptionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOptionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOptionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
