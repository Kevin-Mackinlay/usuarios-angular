import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-formulario-usuario',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './formulario-usuario.html',
  styleUrl: './formulario-usuario.css',
})
export class FormularioUsuario {
  private readonly formBuilder = inject(FormBuilder);
  private readonly usuarioService = inject(UsuarioService);

  //aca tambien tengo dudas
  readonly formularioUsuario = this.formBuilder.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: [''],
  });

  enviando = false;
  mensajeExito = '';
  mensajeError = '';

  enviarFormulario(): void {
    this.mensajeExito = '';
    this.mensajeError = '';
    if (this.formularioUsuario.invalid) {
      this.formularioUsuario.markAllAsTouched();
      return;
    }
    this.enviando = true;

    const datos = this.formularioUsuario.getRawValue();

    this.usuarioService.crearUsuario(datos).subscribe({
      next: (usuarioCreado) => {
        this.mensajeExito = `El usuario ${usuarioCreado.name} fue creado correctamente`;

        this.formularioUsuario.reset();
        this.enviando = false;
      },
      error: (error) => {
        this.mensajeError = 'No se pudo crear el usuario. Intente de nuevo.';

        this.enviando = false;
      },
    });
  }
}
