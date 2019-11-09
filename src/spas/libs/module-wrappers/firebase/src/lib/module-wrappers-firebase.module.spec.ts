import { async, TestBed } from '@angular/core/testing';
import { ModuleWrappersFirebaseModule } from './module-wrappers-firebase.module';

describe('ModuleWrappersFirebaseModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ModuleWrappersFirebaseModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ModuleWrappersFirebaseModule).toBeDefined();
  });
});
