import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [],
})
export class HeroeComponent implements OnInit {
  heroeId: string | null = '';
  constructor(private _activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe(({ id }) => console.log(id));
  }
}
