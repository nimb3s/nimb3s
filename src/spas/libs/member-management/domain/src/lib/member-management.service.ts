import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Member } from './models/Member';
import { MEMBERS } from './mocks/mock-members';
import { MemberManagement } from './member-management.interface';


@Injectable({
  providedIn: 'root'
})

export class MemberManagementService implements MemberManagement {
  mockMembers: Member[] = MEMBERS;


  getMembers(): Observable<Member[]> {
    return of(MEMBERS);
  }

  addMember(user: Member) {
    this.mockMembers.push(user);
  }

  updateMember(index: number, newMember: Member) {
    this.mockMembers[index] = newMember;
  }

  deleteMember(index: number) {
    this.mockMembers.splice(index, 1);
  }
}
