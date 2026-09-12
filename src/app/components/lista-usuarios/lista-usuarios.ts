import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Observable, catchError, map, of, startWith, Subject, switchMap } from 'rxjs';

import { Usuario } from '../../models/usuario';

import { UsuarioService } from '../../services/usuario.service';

type EstadoLista =
  | { estado: 'cargando' }
  | { estado: 'exito'; usuarios: Usuario[] }
  | { estado: 'error' };

@Component({
  selector: 'app-lista-usuarios',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private readonly usuarioService = inject(UsuarioService);

  private readonly recargar$ = new Subject<void>();

  readonly estado$: Observable<EstadoLista> = this.recargar$.pipe(
    startWith(undefined),
    switchMap(() =>
      this.usuarioService.getUsuarios().pipe(
        map((usuarios): EstadoLista => ({
          estado: 'exito',
          usuarios,
        })),
        startWith({
          estado: 'cargando',
        } as EstadoLista),
        catchError(() =>
          of({
            estado: 'error',
          } as EstadoLista),
        ),
      ),
    ),
  );

  reintentar(): void {
    this.recargar$.next();
  }
}
