import { async, TestBed } from '@angular/core/testing';
import { FirebaseModuleWrapper } from './module-wrappers-firebase.module';

describe('FirebaseModuleWrapper', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FirebaseModuleWrapper]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FirebaseModuleWrapper).toBeDefined();
  });
});
