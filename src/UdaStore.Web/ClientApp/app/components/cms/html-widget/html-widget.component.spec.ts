import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlWidgetComponent } from './html-widget.component';

describe('HtmlWidgetComponent', () => {
  let component: HtmlWidgetComponent;
  let fixture: ComponentFixture<HtmlWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
