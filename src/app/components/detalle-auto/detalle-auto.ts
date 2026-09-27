import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { catchError, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';

import { Auto } from '../../models/auto';
import { AutoService } from '../../services/auto.service';

type EstadoDetalleAuto =
  { estado: 'cargando' } | { estado: 'exito'; auto: Auto } | { estado: 'error' };

@Component({
  selector: 'app-detalle-auto',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './detalle-auto.html',
  styleUrl: './detalle-auto.css',
})
export class DetalleAuto {
  private readonly route = inject(ActivatedRoute);
  private readonly autoService = inject(AutoService);

  private readonly recargar$ = new Subject<void>();

  readonly estado$: Observable<EstadoDetalleAuto> = this.route.paramMap.pipe(
    switchMap((parametros) => {
      const id = parametros.get('id');

      if (!id) {
        return of({
          estado: 'error',
        } as EstadoDetalleAuto);
      }

      return this.recargar$.pipe(
        startWith(undefined),

        switchMap(() =>
          this.autoService.getAuto(id).pipe(
            map((auto): EstadoDetalleAuto => ({
              estado: 'exito',
              auto,
            })),

            startWith({
              estado: 'cargando',
            } as EstadoDetalleAuto),

            catchError(() =>
              of({
                estado: 'error',
              } as EstadoDetalleAuto),
            ),
          ),
        ),
      );
    }),
  );

  reintentar(): void {
    this.recargar$.next();
  }
}
