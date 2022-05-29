import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroe!: Heroe;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroePorId(id)))
      .subscribe((heroe: Heroe) => (this.heroe = heroe));
  }
}
