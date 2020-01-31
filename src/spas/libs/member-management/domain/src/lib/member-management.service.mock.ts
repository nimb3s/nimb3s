import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { UserProfile } from './models/user-profile';
import { USERS } from './mocks/mock-users';
import { MemberManagement } from './member-management.interface';


@Injectable({
  providedIn: 'root'
})

export class MemberManagementMockService implements MemberManagement {
  getUsers(): Observable<UserProfile[]> {
    return of(USERS);
  }
}
