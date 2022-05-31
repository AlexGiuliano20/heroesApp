import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { switchMap } from 'rxjs';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 100%;
        border-radius: 10px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics',
    },
  ];

  heroe: Heroe = {
    superhero: '',
    alter_ego: '',
    characters: '',
    first_appearance: '',
    publisher: Publisher.DCComics,
    alt_img: '',
  };

  constructor(
    private _heroesService: HeroesService,
    private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private _snackbar: MatSnackBar,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this._route.url.includes('editar')) {
      return;
    }
    this._activatedRoute.params
      .pipe(switchMap(({ id }) => this._heroesService.getHeroePorId(id)))
      .subscribe((heroe) => (this.heroe = heroe));
  }

  guardar(): void {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      //Actualizar
      this._heroesService
        .actualizarHeroe(this.heroe)
        .subscribe((res) => this.mostrarSnackBar('Registro actualizado'));
    } else {
      // Crear
      this._heroesService.agregarHeroe(this.heroe).subscribe((res) => {
        this._route.navigate(['/heroes/editar', res.id]);
        this.mostrarSnackBar('Registro creado');
      });
    }
  }

  borrar(): void {
    const dialog = this._dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe,
    });
    dialog.afterClosed().subscribe((res) => {
      if (res) {
        this._heroesService
          .borrarHeroe(this.heroe.id!)
          .subscribe((res) => this._route.navigate(['/heroes']));
      }
    });
  }

  mostrarSnackBar(mensaje: string): void {
    this._snackbar.open(mensaje, 'Ok!', {
      duration: 2500,
    });
  }
}
