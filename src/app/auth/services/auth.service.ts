import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { tap, Observable, map, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

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

  verificaAutenticacion(): Observable<boolean> {
    if (!localStorage.getItem('token')) {
      return of(false);
    }
    return this._http.get<Auth>(`${this._apiUrl}/usuarios/1`).pipe(
      map((auth) => {
        this._auth = auth;
        return true;
      })
    );
  }

  login() {
    return this._http.get<Auth>(`${this._apiUrl}/usuarios/1`).pipe(
      tap((res) => (this._auth = res)),
      tap((res) => localStorage.setItem('token', res.id))
    );
  }

  logout() {
    this._auth = undefined;
  }
}
