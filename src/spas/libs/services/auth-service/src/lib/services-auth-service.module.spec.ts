import { async, TestBed } from '@angular/core/testing';
import { ServicesAuthServiceModule } from './services-auth-service.module';

describe('ServicesAuthServiceModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ServicesAuthServiceModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ServicesAuthServiceModule).toBeDefined();
  });
});
