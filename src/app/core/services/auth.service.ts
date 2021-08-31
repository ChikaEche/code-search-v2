import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import * as firebase from 'firebase/auth';
import { from, Observable, of } from 'rxjs';
import { User } from '../interfaces/user';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null | undefined>

  constructor(
    public readonly auth: AngularFireAuth,
    public readonly firestore: AngularFirestore
  ) {

    this.user$ = this.auth.authState.pipe(
      switchMap((user) => {
        return user ?
          this.firestore.doc<User>(`users/${user.uid}`).valueChanges()
          : of(null)
      })
    )
   }

  loginWithGithub() {
    from(this.auth.signInWithPopup(new firebase.GithubAuthProvider())).pipe(
      switchMap(({ user }) => {
        console.log({user})
        return this.refreshUserData({
          userId: user?.uid as string,
          email: user?.email as string,
          displayName: user?.displayName as string
        });
        
      }),
      catchError((err) => {
        console.error("Cannot sign in")
        return of(null)
      })
    )
  }

  refreshUserData(user: User) {
    return this.firestore.doc(`users/${user.userId}`).set(user)
  }
}
