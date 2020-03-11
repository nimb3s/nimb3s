import { TestBed } from '@angular/core/testing';

<<<<<<< HEAD
import { MemberManagementService } from './member-management.service';
=======
import { MemberManagementMockService } from './member-management.service.mock';
>>>>>>> origin/develop

describe('UserMockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
<<<<<<< HEAD
    const service: MemberManagementService = TestBed.get(MemberManagementService);
=======
    const service: MemberManagementMockService = TestBed.get(MemberManagementMockService);
>>>>>>> origin/develop
    expect(service).toBeTruthy();
  });
});
