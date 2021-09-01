import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  constructor(
    private readonly authService: AuthService
  ) { 
    this.authService.user$.pipe(
      tap((user) => {
        this.user$.next(user)
      })
    ).subscribe();
  }

  getCurrentUser() {
    return this.user$.value
  }
}
