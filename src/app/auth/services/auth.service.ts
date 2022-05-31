import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;
  private _auth: Auth | undefined;

  get auth(): Auth {
    return { ...this._auth! };
  }

  constructor(private _http: HttpClient) {}

  login() {
    return this._http
      .get<Auth>(`${this._apiUrl}/usuarios/1`)
      .pipe(tap((res) => (this._auth = res)));
  }

  logout() {
    this._auth = undefined;
  }
}
