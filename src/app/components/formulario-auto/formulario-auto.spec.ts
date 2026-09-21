import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAuto } from './formulario-auto';

describe('FormularioAuto', () => {
  let component: FormularioAuto;
  let fixture: ComponentFixture<FormularioAuto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAuto],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioAuto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
