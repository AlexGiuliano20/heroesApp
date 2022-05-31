import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  login() {
    return this._http.get<Auth>(`${this._apiUrl}/usuarios/1`);
  }
}
