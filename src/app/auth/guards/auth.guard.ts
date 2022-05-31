import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private _authService: AuthService, private _route: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this._authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this._route.navigate(['./auth/login']);
        }
      })
    );
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | boolean {
    return this._authService.verificaAutenticacion().pipe(
      tap((estaAutenticado) => {
        if (!estaAutenticado) {
          this._route.navigate(['./auth/login']);
        }
      })
    );
  }
}
