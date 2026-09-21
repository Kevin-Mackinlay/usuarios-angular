import { AsyncPipe } from '@angular/common';

import { Component, inject } from '@angular/core';

import { ActivatedRoute, RouterLink } from '@angular/router';

import {
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';

import { Usuario } from '../../models/usuario';

import { UsuarioService } from '../../services/usuario.service';

type EstadoDetalle =
  | { estado: 'cargando' }
  | { estado: 'exito'; usuario: Usuario }
  | { estado: 'no-encontrado' }
  | { estado: 'id-invalido' }
  | { estado: 'error' };

@Component({
  selector: 'app-detalle-usuario',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css',
})
export class DetalleUsuario {
  private readonly route = inject(ActivatedRoute);

  private readonly usuarioService = inject(UsuarioService);

  private readonly recargar$ = new Subject<void>();

  readonly estado$: Observable<EstadoDetalle> = combineLatest([
    this.route.paramMap,
    this.recargar$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([params]) => {
      const valorId = params.get('id');

      if (valorId === null || valorId.trim() === '') {
        return of<EstadoDetalle>({
          estado: 'id-invalido',
        });
      }

      const id = valorId.trim();

      return this.usuarioService.getUsuario(id).pipe(
        map((usuario): EstadoDetalle => ({
          estado: 'exito',
          usuario,
        })),

        startWith({
          estado: 'cargando',
        } as EstadoDetalle),

        catchError((error: unknown) => {
          const usuarioNoExiste =
            error instanceof Error && error.message === 'El usuario no existe.';

          return of<EstadoDetalle>(
            usuarioNoExiste ? { estado: 'no-encontrado' } : { estado: 'error' },
          );
        }),
      );
    }),
  );

  reintentar(): void {
    this.recargar$.next();
  }
}
