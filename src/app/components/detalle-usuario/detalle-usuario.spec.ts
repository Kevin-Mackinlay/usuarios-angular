import { provideHttpClient } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { DetalleUsuario } from './detalle-usuario';

describe('DetalleUsuario', () => {
  let component: DetalleUsuario;
  let fixture: ComponentFixture<DetalleUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleUsuario],

      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleUsuario);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
