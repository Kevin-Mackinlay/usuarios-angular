import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dialogo-confirmacion',
  imports: [],
  templateUrl: './dialogo-confirmacion.html',
})
export class DialogoConfirmacion {
  @Input() nombreUsuario = '';
  @Input() eliminando = false;

  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  confirmarEliminacion(): void {
    this.confirmar.emit();
  }

  cancelarEliminacion(): void {
    this.cancelar.emit();
  }
}
