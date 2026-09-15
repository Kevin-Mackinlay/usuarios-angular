import { provideHttpClient } from '@angular/common/http';

import { provideHttpClientTesting } from '@angular/common/http/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { provideRouter } from '@angular/router';

import { ListaUsuarios } from './lista-usuarios';

describe('ListaUsuarios', () => {
  let component: ListaUsuarios;
  let fixture: ComponentFixture<ListaUsuarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaUsuarios],

      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaUsuarios);
    component = fixture.componentInstance;

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
