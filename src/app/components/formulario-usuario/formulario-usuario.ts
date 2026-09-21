import { ChangeDetectorRef, Component, DestroyRef, inject, OnInit } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, RouterLink } from '@angular/router';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { catchError, EMPTY, finalize, switchMap } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';

import { noSoloEspaciosValidator } from '../../validators/no-solo-espacios.validator';

@Component({
  selector: 'app-formulario-usuario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-usuario.html',
  styleUrl: './formulario-usuario.css',
})
export class FormularioUsuario implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  readonly formularioUsuario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3), noSoloEspaciosValidator]],

    email: ['', [Validators.required, Validators.email]],

    telefono: ['', [Validators.pattern(/^[0-9+().\-\sx]+$/i)]],
  });

  modoEdicion = false;
  usuarioId: string | null = null;

  cargandoUsuario = false;
  enviando = false;

  mensajeExito = '';
  mensajeError = '';

  ngOnInit(): void {
    this.formularioUsuario.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.mensajeExito = '';
      this.mensajeError = '';
    });

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const valorId = params.get('id');

          // Si no existe ID, estamos creando un usuario.
          if (valorId === null) {
            this.modoEdicion = false;
            this.usuarioId = null;

            return EMPTY;
          }

          // Si existe ID, estamos editando.
          this.modoEdicion = true;

         const id = valorId.trim();

         if (id === '') {
           this.mensajeError = 'El ID del usuario no es válido.';
           return EMPTY;
         }

          this.usuarioId = id;
          this.cargandoUsuario = true;

          return this.usuarioService.getUsuario(id).pipe(
            catchError(() => {
              this.mensajeError = 'No se pudo cargar el usuario.';

              return EMPTY;
            }),

            finalize(() => {
              this.cargandoUsuario = false;

              this.changeDetectorRef.markForCheck();
            }),
          );
        }),

        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((usuario) => {
        this.formularioUsuario.patchValue(
          {
            nombre: usuario.name,
            email: usuario.email,
            telefono: usuario.phone,
          },
          {
            emitEvent: false,
          },
        );
      });
  }

  enviarFormulario(): void {
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formularioUsuario.invalid) {
      this.formularioUsuario.markAllAsTouched();
      return;
    }

    const datos = this.formularioUsuario.getRawValue();

    if (this.modoEdicion && this.usuarioId === null) {
      this.mensajeError = 'No se puede actualizar porque el ID no es válido.';

      return;
    }

    this.enviando = true;

    const peticion$ = this.modoEdicion
      ? this.usuarioService.actualizarUsuario(this.usuarioId!, datos)
      : this.usuarioService.crearUsuario(datos);

    peticion$
      .pipe(
        finalize(() => {
          this.enviando = false;

          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe({
        next: (usuarioGuardado) => {
          this.mensajeExito = this.modoEdicion
            ? `El usuario ${usuarioGuardado.name} fue actualizado correctamente.`
            : `El usuario ${usuarioGuardado.name} fue creado correctamente.`;

          // Solamente vaciamos el formulario
          // cuando estamos creando.
          if (!this.modoEdicion) {
            this.formularioUsuario.reset(
              {
                nombre: '',
                email: '',
                telefono: '',
              },
              {
                emitEvent: false,
              },
            );
          }
        },

        error: () => {
          this.mensajeError = this.modoEdicion
            ? 'No se pudo actualizar el usuario. Intentá nuevamente.'
            : 'No se pudo crear el usuario. Intentá nuevamente.';
        },
      });
  }
}
