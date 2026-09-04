import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [AsyncPipe],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private readonly usuarioService = inject(UsuarioService);

  readonly usuarios$ = this.usuarioService.getUsuarios();
}