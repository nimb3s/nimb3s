import { Observable } from 'rxjs';
import { User } from './models/user-profile';

export interface UserInterface {
  getUsers: Observable<User[]>;
 }
