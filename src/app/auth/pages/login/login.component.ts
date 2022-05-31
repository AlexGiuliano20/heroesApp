import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
})
export class LoginComponent {
  constructor(private _route: Router, private _authService: AuthService) {}

  login(): void {
    // Ir al backend
    // Un usuario
    this._authService.login().subscribe((res) => {
      console.log(res);
      if (res.id) {
        this._route.navigate(['/heroes']);
      }
    });
  }
}
