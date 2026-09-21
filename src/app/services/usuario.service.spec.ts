import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { UsuarioService } from './usuario.service';

describe('UsuarioService', () => {
  let service: UsuarioService;
  let httpTesting: HttpTestingController;

  const apiUrl = 'https://jsonplaceholder.typicode.com/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UsuarioService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(UsuarioService);

    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('debe crear un usuario con POST y mapear el body', () => {
    const datos = {
      nombre: 'Kevin',
      email: 'kevin@email.com',
      telefono: '123456',
    };

    service.crearUsuario(datos).subscribe();

    const peticion = httpTesting.expectOne(apiUrl);

    expect(peticion.request.method).toBe('POST');

    expect(peticion.request.body).toEqual({
      name: 'Kevin',
      email: 'kevin@email.com',
      phone: '123456',
    });

    peticion.flush({
      id: 11,
      name: 'Kevin',
      email: 'kevin@email.com',
      phone: '123456',
    });
  });

  it('debe actualizar un usuario con PATCH y mapear el body', () => {
    const datos = {
      nombre: 'Kevin actualizado',
      email: 'actualizado@email.com',
      telefono: '654321',
    };

    service.actualizarUsuario(3, datos).subscribe();

    const peticion = httpTesting.expectOne(`${apiUrl}/3`);

    expect(peticion.request.method).toBe('PATCH');

    expect(peticion.request.body).toEqual({
      name: 'Kevin actualizado',
      email: 'actualizado@email.com',
      phone: '654321',
    });

    peticion.flush({
      id: 3,
      name: 'Kevin actualizado',
      email: 'actualizado@email.com',
      phone: '654321',
    });
  });

  it('debe eliminar un usuario con DELETE', () => {
    service.eliminarUsuario('4').subscribe();

    const peticion = httpTesting.expectOne(`${apiUrl}/4`);

    expect(peticion.request.method).toBe('DELETE');

    peticion.flush(null);
  });

  it('debe recibir el error cuando el servidor responde 500', () => {
    let errorRecibido: HttpErrorResponse | undefined;

    service.getUsuarios().subscribe({
      error: (error: HttpErrorResponse) => {
        errorRecibido = error;
      },
    });

    const peticion = httpTesting.expectOne(apiUrl);

    peticion.flush('Error del servidor', {
      status: 500,
      statusText: 'Internal Server Error',
    });

    expect(errorRecibido?.status).toBe(500);
  });
});
