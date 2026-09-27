import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { DetalleAuto } from './detalle-auto';

describe('DetalleAuto', () => {
  let component: DetalleAuto;
  let fixture: ComponentFixture<DetalleAuto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleAuto],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleAuto);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
