import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialogo-confirmacion',
  imports: [],
  templateUrl: './dialogo-confirmacion.html',
})
export class DialogoConfirmacion {
  @Input() titulo = 'Eliminar usuario';

  // Entrada nueva para autos u otros elementos.
  @Input() nombreElemento = '';

  // Se conserva para no romper la eliminación de usuarios.
  @Input() nombreUsuario = '';

  @Input() eliminando = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  get nombreMostrado(): string {
    return this.nombreElemento || this.nombreUsuario;
  }

  confirmarEliminacion(): void {
    this.confirmar.emit();
  }

  cancelarEliminacion(): void {
    this.cancelar.emit();
  }
}
