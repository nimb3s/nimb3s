import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Member } from './models/Member';
import { MEMBERS } from './mocks/mock-members';
import { MemberManagement } from './member-management.interface';


@Injectable({
  providedIn: 'root'
})

export class MemberManagementService implements MemberManagement {
  mockUsers: Member[] = MEMBERS;

  getUsers(): Observable<Member[]> {
    return of(MEMBERS);
  }

  addMember(user: Member) {
    this.mockUsers.push(user);
  }

  deleteMember(index: number) {
    this.mockUsers.splice(index, 1);
  }
}
