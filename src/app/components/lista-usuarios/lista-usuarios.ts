import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {RouterLink} from '@angular/router';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-lista-usuarios',
  imports: [AsyncPipe, RouterLink],
  templateUrl: './lista-usuarios.html',
  styleUrl: './lista-usuarios.css',
})
export class ListaUsuarios {
  private readonly usuarioService = inject(UsuarioService);

  readonly usuarios$ = this.usuarioService.getUsuarios();
}