import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutFeatureComponent } from './layout-feature.component';

describe('LayoutFeatureComponent', () => {
  let component: LayoutFeatureComponent;
  let fixture: ComponentFixture<LayoutFeatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayoutFeatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
