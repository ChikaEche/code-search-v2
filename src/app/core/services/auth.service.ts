import { Injectable } from '@angular/core';
import { Auth, authState, signInWithPopup, signOut } from '@angular/fire/auth';
import * as firebase from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { Firestore, doc, docData, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>

  constructor(
    public readonly auth: Auth,
    public readonly firestore: Firestore
  ) {
 
    this.user$ = authState(this.auth).pipe(
      switchMap((user) => {
        const docRef = doc(this.firestore, `users/${user?.uid}`)
        return user ?
          docData(docRef)
          : of(null)
      }),
      map((user) => user as User)
    )
  }

  loginWithGithub() {
    return from(signInWithPopup(this.auth, new firebase.GithubAuthProvider)).pipe(
      switchMap(({ user }) => {
        return this.refreshUserData({
          userId: user?.uid as string,
          email: user?.email as string,
          displayName: user?.displayName as string
        });
      })
    )
  }

  refreshUserData(user: User) {
    return from(setDoc(doc(this.firestore, `users/${user.userId}`), user));
  }

  logOut() {
    return from(signOut(this.auth))
  }
}
