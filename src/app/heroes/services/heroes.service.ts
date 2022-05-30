import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Heroe } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private _apiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) {}

  getHeroes(): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(`${this._apiUrl}/heroes`);
  }

  getHeroePorId(id: string): Observable<Heroe> {
    return this._http.get<Heroe>(`${this._apiUrl}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Heroe[]> {
    return this._http.get<Heroe[]>(
      `${this._apiUrl}/heroes?q=${termino}&_limit=6`
    );
  }

  agregarHeroe(heroe: Heroe): Observable<Heroe> {
    return this._http.post<Heroe>(`${this._apiUrl}/heroes`, heroe);
  }

  actualizarHeroe(heroe: Heroe): Observable<Heroe> {
    return this._http.put<Heroe>(`${this._apiUrl}/heroes/${heroe.id}`, heroe);
  }
}
