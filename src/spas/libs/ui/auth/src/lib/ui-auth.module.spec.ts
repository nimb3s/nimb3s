import { async, TestBed } from '@angular/core/testing';
import { UiAuthModule } from './ui-auth.module';

describe('UiAuthModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [UiAuthModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(UiAuthModule).toBeDefined();
  });
});
