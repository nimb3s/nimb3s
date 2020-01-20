import { Injectable } from '@angular/core';
import { User } from './models/user-profile';
import { USERS } from './mocks/mock-users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserMockService {

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(USERS);
  }
}
