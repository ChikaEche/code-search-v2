import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  login() {
    this.authService.loginWithGithub().pipe(
      tap(() => this.router.navigate([''])),
      catchError((err) => {
        console.error("Cannot sign in", {err})
        return of(null)
      })
    ).subscribe()
  }

}
