import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { ActivatedRoute, RouterLink } from '@angular/router';
import { EMPTY, finalize, switchMap } from 'rxjs';

import { AutoService } from '../../services/auto.service';
import { DatosAutoFormulario } from '../../models/datos-auto-formulario';

@Component({
  selector: 'app-formulario-auto',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-auto.html',
  styleUrl: './formulario-auto.css',
})
export class FormularioAuto implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly autoService = inject(AutoService);
  private readonly route = inject(ActivatedRoute);

  readonly anioMaximo = new Date().getFullYear() + 1;

  modoEdicion = false;
  autoId: string | null = null;
  cargandoAuto = false;
  guardando = false;
  formularioEnviado = false;
  mensajeExito = '';
  mensajeError = '';

  formulario = this.formBuilder.nonNullable.group({
    marca: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/\S/)]],
    modelo: ['', [Validators.required, Validators.minLength(1), Validators.pattern(/\S/)]],
    anio: [
      new Date().getFullYear(),
      [Validators.required, Validators.min(1900), Validators.max(this.anioMaximo)],
    ],
    patente: [
      '',
      [
        Validators.required,
        Validators.pattern(/^([A-Za-z]{3}\s?\d{3}|[A-Za-z]{2}\s?\d{3}\s?[A-Za-z]{2})$/),
      ],
    ],
    color: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/\S/)]],
  });

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((parametros) => {
          const id = parametros.get('id');

          this.autoId = id;
          this.modoEdicion = id !== null;

          if (!id) {
            return EMPTY;
          }

          this.cargandoAuto = true;
          this.mensajeError = '';

          return this.autoService.getAuto(id).pipe(finalize(() => (this.cargandoAuto = false)));
        }),
      )
      .subscribe({
        next: (auto) => {
          this.formulario.patchValue({
            marca: auto.marca,
            modelo: auto.modelo,
            anio: auto.anio,
            patente: auto.patente,
            color: auto.color,
          });
        },
        error: () => {
          this.mensajeError = 'No se pudo cargar el auto.';
        },
      });
  }

  guardar(): void {
    this.formularioEnviado = true;
    this.mensajeExito = '';
    this.mensajeError = '';

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();

    const datos: DatosAutoFormulario = {
      marca: valores.marca.trim(),
      modelo: valores.modelo.trim(),
      anio: Number(valores.anio),
      patente: valores.patente.trim().toUpperCase(),
      color: valores.color.trim(),
    };

    const operacion$ =
      this.modoEdicion && this.autoId
        ? this.autoService.actualizarAuto(this.autoId, datos)
        : this.autoService.crearAuto(datos);

    this.guardando = true;

    operacion$.pipe(finalize(() => (this.guardando = false))).subscribe({
      next: () => {
        this.mensajeExito = this.modoEdicion
          ? 'Auto actualizado correctamente.'
          : 'Auto creado correctamente.';

        if (!this.modoEdicion) {
          this.formulario.reset({
            marca: '',
            modelo: '',
            anio: new Date().getFullYear(),
            patente: '',
            color: '',
          });

          this.formularioEnviado = false;
        }
      },
      error: () => {
        this.mensajeError = this.modoEdicion
          ? 'No se pudo actualizar el auto.'
          : 'No se pudo crear el auto.';
      },
    });
  }
}
