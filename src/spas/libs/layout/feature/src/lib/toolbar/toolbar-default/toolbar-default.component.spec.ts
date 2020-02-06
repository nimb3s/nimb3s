import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarDefaultComponent } from './toolbar-default.component';

describe('ToolbarDefaultComponent', () => {
  let component: ToolbarDefaultComponent;
  let fixture: ComponentFixture<ToolbarDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
