import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    this.authService.logOut().pipe(
      tap(() => this.router.navigate(['/login']))
    ).subscribe()
  }

}
