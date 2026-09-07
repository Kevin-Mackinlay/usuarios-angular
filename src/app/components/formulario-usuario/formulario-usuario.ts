import { Component,inject } from '@angular/core';
import {FormBuilder,ReactiveFormsModule,Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formulario-usuario',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './formulario-usuario.html',
  styleUrl: './formulario-usuario.css',
})
export class FormularioUsuario {
  private readonly formBuilder = inject(FormBuilder);

  readonly formularioUsuario = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.minLength(3) ]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['']
  });

  formularioEnviado = false;

  enviarFormulario(): void {

     this.formularioEnviado = false;

    if (this.formularioUsuario.invalid) {
     this.formularioUsuario.markAllAsTouched();
     return;
    }

    console.log('Usuario:',this.formularioUsuario.value);

    this.formularioEnviado = true;
    this.formularioUsuario.reset();
  }
}
