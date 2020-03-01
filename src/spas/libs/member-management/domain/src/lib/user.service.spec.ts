import { TestBed } from '@angular/core/testing';

import { MemberManagementMockService } from './member-management.service.mock';

describe('UserMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberManagementMockService = TestBed.get(MemberManagementMockService);
    expect(service).toBeTruthy();
  });
});
