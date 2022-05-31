import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';
import { Auth } from 'src/app/auth/interfaces/auth.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
    `
      .container {
        margin: 10px;
      }
    `,
  ],
})
export class HomeComponent implements OnInit {
  get auth() {
    return this._authService.auth;
  }

  constructor(private _route: Router, private _authService: AuthService) {}

  ngOnInit(): void {}

  logout(): void {
    this._route.navigate(['./auth']);
  }
}
