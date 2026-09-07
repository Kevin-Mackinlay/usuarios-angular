import  {AsyncPipe} from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';

import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-detalle-usuario',
  imports: [AsyncPipe,RouterLink],
  templateUrl: './detalle-usuario.html',
  styleUrl: './detalle-usuario.css',
})
export class DetalleUsuario {
  private readonly route = inject(ActivatedRoute);
  private readonly usuarioService = inject(UsuarioService);

  readonly usuario$ = this.route.paramMap.pipe(
    switchMap((params) => {
      const id = Number (params.get('id'));
      return this.usuarioService.getUsuario(id);
    }),
  )
}
