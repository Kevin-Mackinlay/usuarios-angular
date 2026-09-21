import { inject, Injectable } from '@angular/core';
import {addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, updateDoc} from 'firebase/firestore';  

import { Observable, from, map } from 'rxjs';
import {db} from '../firebase.config';
import { Usuario } from '../models/usuario';
import { DatosUsuarioFormulario } from '../models/datos-usuario-formulario';

//dudas de porque se usa el pick
type DatosUsuarioApi = Pick<Usuario, 'name' | 'email' | 'phone'>;

@Injectable({
  providedIn: 'root',
})


export class UsuarioService {
  private readonly usuariosCollection = collection(db, 'usuarios');

  getUsuarios(): Observable<Usuario[]> {
    return new Observable<Usuario[]>((subscriber) => {
      const cancelarEscucha = onSnapshot(
        this.usuariosCollection,

        (snapshot) => {
          const usuarios = snapshot.docs.map((documento) => ({
            ...(documento.data() as Omit<Usuario, 'id'>),
            id: documento.id,
          }));

          subscriber.next(usuarios);
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

  getUsuario(id: string): Observable<Usuario> {
    const usuarioDocumento = doc(db, 'usuarios', id);

    return from(getDoc(usuarioDocumento)).pipe(
      map((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error('El usuario no existe.');
        }

        return {
          ...(snapshot.data() as Omit<Usuario, 'id'>),
          id: snapshot.id,
        };
      }),
    );
  }

  crearUsuario(datos: DatosUsuarioFormulario): Observable<Usuario> {
    const usuario = this.mapearDatos(datos);

    return from(addDoc(this.usuariosCollection, usuario)).pipe(
      map((documentoCreado) => ({
        ...usuario,
        id: documentoCreado.id,
      })),
    );
  }

  actualizarUsuario(id: string, datos: DatosUsuarioFormulario): Observable<Usuario> {
    const usuario = this.mapearDatos(datos);

    const usuarioDocumento = doc(db, 'usuarios', id);

    return from(updateDoc(usuarioDocumento, usuario)).pipe(
      map(() => ({
        ...usuario,
        id,
      })),
    );
  }

  eliminarUsuario(id: string): Observable<void> {
    const usuarioDocumento = doc(db, 'usuarios', id);

    return from(deleteDoc(usuarioDocumento));
  }

  private mapearDatos(datos: DatosUsuarioFormulario): Omit<Usuario, 'id'> {
    return {
      name: datos.nombre,
      email: datos.email,
      phone: datos.telefono,
    };
  }
}