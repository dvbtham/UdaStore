import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselWidgetComponent } from './carousel-widget.component';

describe('CarouselWidgetComponent', () => {
  let component: CarouselWidgetComponent;
  let fixture: ComponentFixture<CarouselWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarouselWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarouselWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
