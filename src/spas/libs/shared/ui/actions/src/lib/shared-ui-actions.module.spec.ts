import { async, TestBed } from '@angular/core/testing';
import { SharedUiActionsModule } from './shared-ui-actions.module';

describe('SharedUiActionsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedUiActionsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(SharedUiActionsModule).toBeDefined();
  });
});
