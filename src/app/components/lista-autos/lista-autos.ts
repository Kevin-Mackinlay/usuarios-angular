import { AsyncPipe } from '@angular/common';

import { Component, inject } from '@angular/core';

import { RouterLink } from '@angular/router';

import { catchError, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';

import { Auto } from '../../models/auto';

import { AutoService } from '../../services/auto.service';

type EstadoListaAutos =
  { estado: 'cargando' } | { estado: 'exito'; autos: Auto[] } | { estado: 'error' };

@Component({
  selector: 'app-lista-autos',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './lista-autos.html',
  styleUrl: './lista-autos.css',
})
export class ListaAutos {
  private readonly autoService = inject(AutoService);

  private readonly recargar$ = new Subject<void>();

  readonly estado$: Observable<EstadoListaAutos> = this.recargar$.pipe(
    startWith(undefined),

    switchMap(() =>
      this.autoService.getAutos().pipe(
        map((autos): EstadoListaAutos => ({
          estado: 'exito',
          autos,
        })),

        startWith({
          estado: 'cargando',
        } as EstadoListaAutos),

        catchError(() =>
          of({
            estado: 'error',
          } as EstadoListaAutos),
        ),
      ),
    ),
  );

  reintentar(): void {
    this.recargar$.next();
  }
}
