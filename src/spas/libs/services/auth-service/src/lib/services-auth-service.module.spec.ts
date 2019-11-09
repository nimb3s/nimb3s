import { async, TestBed } from '@angular/core/testing';
import { AuthServiceModule } from './services-auth-service.module';

describe('AuthServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AuthServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AuthServiceModule).toBeDefined();
  });
});
