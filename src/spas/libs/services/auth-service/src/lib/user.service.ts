import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthService {

user$: Observable<User>;

    constructor(
        private firestoreAuth: AngularFireAuth,
        private firestore: AngularFirestore,
        private router: Router
    ) {
        // Get the auth state, then fetch the Firestore user document or return null
        this.user$ = this.firestoreAuth.authState.pipe(
            switchMap(user => {
                // Logged in
                if (user) {
                    return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
                } else {
                    // Logged out
                    return of(null);
                }
            }
        ));
    }

    async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.firestoreAuth.auth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
    }

    private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.uid}`);

    const data = { 
        uid: user.uid, 
        email: user.email, 
        displayName: user.displayName, 
        photoURL: user.photoURL
    } 

    return userRef.set(data, { merge: true })

    }

    async signOut() {
    await this.firestoreAuth.auth.signOut();
    this.router.navigate(['/']);
    }

}