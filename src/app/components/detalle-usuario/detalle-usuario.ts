import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  switchMap,
  catchError,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
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

  //tengo dudas en como usar esto
  readonly estado$: Observable<EstadoDetalle> = combineLatest([
    this.route.paramMap,
    this.recargar$.pipe(startWith(undefined)),
  ]).pipe(
    switchMap(([params]) => {
      const valorId = params.get('id');
      const id = Number(valorId);
      if (valorId === null || !Number.isInteger(id) || id <= 0) {
        return of<EstadoDetalle>({
          estado: 'id-invalido',
        });
      }

      return this.usuarioService.getUsuario(id).pipe(
        map((usuario): EstadoDetalle =>
          usuario ? { estado: 'exito', usuario } : { estado: 'no-encontrado' },
        ),

        startWith({
          estado: 'cargando',
        } as EstadoDetalle),

        catchError((error: HttpErrorResponse) =>
          of<EstadoDetalle>(
            error.status === 404 ? { estado: 'no-encontrado' } : { estado: 'error' },
          ),
        ),
      );
    }),
  );
  reintentar(): void {
    this.recargar$.next();
  }
}
