import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAutos } from './lista-autos';

describe('ListaAutos', () => {
  let component: ListaAutos;
  let fixture: ComponentFixture<ListaAutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAutos],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaAutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
