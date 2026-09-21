import { AsyncPipe } from '@angular/common';
import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Observable, catchError, map, of, startWith, Subject, switchMap, finalize } from 'rxjs';

import { DialogoConfirmacion } from '../dialogo-confirmacion/dialogo-confirmacion';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';

type EstadoLista =
  { estado: 'cargando' } | { estado: 'exito'; usuarios: Usuario[] } | { estado: 'error' };

@Component({
  selector: 'app-lista-usuarios',
  imports: [AsyncPipe, RouterLink, DialogoConfirmacion],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private readonly usuarioService = inject(UsuarioService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly recargar$ = new Subject<void>();

  private readonly idsEliminados = new Set<string>();

  usuarioSeleccionado: Usuario | null = null;
  eliminando = false;

  mensajeEliminacion = '';
  mensajeErrorEliminacion = '';

  readonly estado$: Observable<EstadoLista> = this.recargar$.pipe(
    startWith(undefined),

    switchMap(() =>
      this.usuarioService.getUsuarios().pipe(
        map((usuarios): EstadoLista => ({
          estado: 'exito',
          usuarios: usuarios.filter((usuario) => !this.idsEliminados.has(usuario.id)),
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

  abrirDialogoEliminacion(usuario: Usuario): void {
    this.usuarioSeleccionado = usuario;
  }

  cancelarEliminacion(): void {
    this.usuarioSeleccionado = null;
  }
  confirmarEliminacion(): void {
    const usuario = this.usuarioSeleccionado;

    if (usuario === null || this.eliminando) {
      return;
    }

    this.eliminando = true;
    this.mensajeEliminacion = '';
    this.mensajeErrorEliminacion = '';

    this.usuarioService
      .eliminarUsuario(usuario.id)
      .pipe(
        finalize(() => {
          this.eliminando = false;
          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe({
        next: () => {
          this.idsEliminados.add(usuario.id);

          this.mensajeEliminacion = `El usuario ${usuario.name} fue eliminado correctamente.`;

          this.usuarioSeleccionado = null;

          this.recargar$.next();
        },
        error: () => {
          this.mensajeErrorEliminacion = 'No se pudo eliminar el usuario. Intentá nuevamente.';
        },
      });
  }
}
