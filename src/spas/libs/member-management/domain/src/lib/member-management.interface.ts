import { Observable } from 'rxjs';
import { Member } from './models/Member';

export interface MemberManagement {
  getMembers(): Observable<Member[]>;
 }
