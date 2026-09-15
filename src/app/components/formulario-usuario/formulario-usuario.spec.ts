import { provideHttpClient } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { FormularioUsuario } from './formulario-usuario';

describe('FormularioUsuario', () => {
  let component: FormularioUsuario;
  let fixture: ComponentFixture<FormularioUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioUsuario],

      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioUsuario);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('debe mostrar el mensaje cuando el email está vacío y tocado', () => {
    const controlEmail = component.formularioUsuario.controls.email;

    controlEmail.markAsTouched();

    fixture.detectChanges();

    const contenido = fixture.nativeElement.textContent as string;

    expect(contenido).toContain('El email es obligatorio.');
  });

  it('debe mostrar un error cuando el nombre contiene solamente espacios', () => {
    const controlNombre = component.formularioUsuario.controls.nombre;

    controlNombre.setValue('   ');
    controlNombre.markAsTouched();

    fixture.detectChanges();

    expect(controlNombre.invalid).toBe(true);

    expect(controlNombre.hasError('soloEspacios')).toBe(true);

    const contenido = fixture.nativeElement.textContent as string;

    expect(contenido).toContain('El nombre no puede contener solamente espacios.');
  });
});
