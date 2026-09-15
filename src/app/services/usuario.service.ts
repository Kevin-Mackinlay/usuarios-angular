import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { DatosUsuarioFormulario } from '../models/datos-usuario-formulario';

//dudas de porque se usa el pick
type DatosUsuarioApi = Pick<Usuario, 'name' | 'email' | 'phone'>;

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users';

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  crearUsuario(datos: DatosUsuarioFormulario): Observable<Usuario> {
    const usuarioApi = this.mapearDatos(datos);

    return this.http.post<Usuario>(this.apiUrl, usuarioApi);
  }

  actualizarUsuario(id: number, datos: DatosUsuarioFormulario): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${id}`, this.mapearDatos(datos));
  }
  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  private mapearDatos(datos: DatosUsuarioFormulario): DatosUsuarioApi {
    return {
      name: datos.nombre,
      email: datos.email,
      phone: datos.telefono,
    };
  }
}
