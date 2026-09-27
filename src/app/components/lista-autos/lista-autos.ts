import { AsyncPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { catchError, finalize, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';

import { Auto } from '../../models/auto';
import { AutoService } from '../../services/auto.service';
import { DialogoConfirmacion } from '../dialogo-confirmacion/dialogo-confirmacion';

type EstadoListaAutos =
  { estado: 'cargando' } | { estado: 'exito'; autos: Auto[] } | { estado: 'error' };

@Component({
  selector: 'app-lista-autos',
  imports: [AsyncPipe, RouterLink, DialogoConfirmacion],
  templateUrl: './lista-autos.html',
  styleUrl: './lista-autos.css',
})
export class ListaAutos {
  private readonly autoService = inject(AutoService);
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  private readonly recargar$ = new Subject<void>();

  autoSeleccionado: Auto | null = null;
  eliminando = false;
  mensajeEliminacion = '';
  mensajeErrorEliminacion = '';

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

  abrirDialogoEliminacion(auto: Auto): void {
    this.autoSeleccionado = auto;
    this.mensajeEliminacion = '';
    this.mensajeErrorEliminacion = '';
  }

  cancelarEliminacion(): void {
    if (this.eliminando) {
      return;
    }

    this.autoSeleccionado = null;
  }

  confirmarEliminacion(): void {
    const auto = this.autoSeleccionado;

    if (!auto || this.eliminando) {
      return;
    }

    this.eliminando = true;
    this.mensajeEliminacion = '';
    this.mensajeErrorEliminacion = '';

    this.autoService
      .eliminarAuto(auto.id)
      .pipe(
        finalize(() => {
          this.eliminando = false;
          this.changeDetectorRef.detectChanges();
        }),
      )
      .subscribe({
        next: () => {
          this.autoSeleccionado = null;
          this.mensajeEliminacion = 'Auto eliminado correctamente.';

          setTimeout(() => {
            this.mensajeEliminacion = '';
            this.changeDetectorRef.detectChanges();
          }, 3000);
        },

        error: () => {
          this.mensajeErrorEliminacion = 'No se pudo eliminar el auto.';
        },
      });
  }
}
