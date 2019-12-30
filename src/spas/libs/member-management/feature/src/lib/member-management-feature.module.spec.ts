import { async, TestBed } from '@angular/core/testing';
import { MemberManagementFeatureModule } from './member-management-feature.module';

describe('MemberManagementFeatureModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MemberManagementFeatureModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(MemberManagementFeatureModule).toBeDefined();
  });
});
