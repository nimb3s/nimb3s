import { Observable } from 'rxjs';
import { UserProfile } from './models/user-profile';

export interface MemberManagement {
  getUsers(): Observable<UserProfile[]>;
 }
