import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-modal-confirmar-exclusao',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './modal-confirmar-exclusao.component.html',
  styleUrl: './modal-confirmar-exclusao.component.scss'
})
export class ModalConfirmarExclusaoComponent {
  @Input() nome: string = '';
  @Output() confirmar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();

  onConfirmar() {
    this.confirmar.emit();
  }
  onCancelar() {
    this.cancelar.emit();
  }
}
