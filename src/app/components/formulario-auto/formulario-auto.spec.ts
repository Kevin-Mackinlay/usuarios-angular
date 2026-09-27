import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { FormularioAuto } from './formulario-auto';

describe('FormularioAuto', () => {
  let component: FormularioAuto;
  let fixture: ComponentFixture<FormularioAuto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAuto],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAuto);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
