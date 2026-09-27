import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { ListaAutos } from './lista-autos';
import { AutoService } from '../../services/auto.service';

describe('ListaAutos', () => {
  let component: ListaAutos;
  let fixture: ComponentFixture<ListaAutos>;

  const autoServiceMock = {
    getAutos: () => of([]),
    eliminarAuto: () => of(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAutos],

      providers: [
        provideRouter([]),
        {
          provide: AutoService,
          useValue: autoServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAutos);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
