import { Injectable } from '@angular/core';

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';

import { from, map, Observable } from 'rxjs';
import { db } from '../firebase.config';
import { Auto } from '../models/auto';
import { DatosAutoFormulario } from '../models/datos-auto-formulario';

@Injectable({
  providedIn: 'root',
})
export class AutoService {
  private readonly autosCollection = collection(db, 'autos');

  getAutos(): Observable<Auto[]> {
    return new Observable<Auto[]>((subscriber) => {
      const cancelarEscucha = onSnapshot(
        this.autosCollection,

        (snapshot) => {
          const autos: Auto[] = snapshot.docs.map((documento) => ({
            ...(documento.data() as Omit<Auto, 'id'>),
            id: documento.id,
          }));

          subscriber.next(autos);
        },

        (error) => {
          subscriber.error(error);
        },
      );

      return () => {
        cancelarEscucha();
      };
    });
  }

  getAuto(id: string): Observable<Auto> {
    const autoDocumento = doc(db, 'autos', id);

    return from(getDoc(autoDocumento)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('El auto no existe.');
        }

        return {
          ...(snapshot.data() as Omit<Auto, 'id'>),
          id: snapshot.id,
        };
      }),
    );
  }
  crearAuto(datos: DatosAutoFormulario): Observable<Auto> {
    const auto = this.mapearDatos(datos);

    return from(addDoc(this.autosCollection, auto)).pipe(
      map((documentoCreado) => ({
        ...auto,
        id: documentoCreado.id,
      })),
    );
  }

  actualizarAuto(id: string, datos: DatosAutoFormulario): Observable<Auto> {
    const auto = this.mapearDatos(datos);

    const autoDocumento = doc(db, 'autos', id);

    return from(updateDoc(autoDocumento, auto)).pipe(
      map(() => ({
        ...auto,
        id,
      })),
    );
  }

  eliminarAuto(id: string): Observable<void> {
    const autoDocumento = doc(db, 'autos', id);

    return from(deleteDoc(autoDocumento));
  }

  private mapearDatos(datos: DatosAutoFormulario): Omit<Auto, 'id'> {
    return {
      marca: datos.marca,
      modelo: datos.modelo,
      anio: datos.anio,
      patente: datos.patente,
      color: datos.color,
    };
  }
}
