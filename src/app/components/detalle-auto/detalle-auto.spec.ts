import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleAuto } from './detalle-auto';

describe('DetalleAuto', () => {
  let component: DetalleAuto;
  let fixture: ComponentFixture<DetalleAuto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAuto],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAuto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
