import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersStartComponent } from './members-start.component';

describe('MembersStartComponent', () => {
  let component: MembersStartComponent;
  let fixture: ComponentFixture<MembersStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
