import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { ModalConfirmarExclusaoComponent } from './modal-confirmar-exclusao.component';

@Component({
  selector: 'app-funcionario-listar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, RouterModule],
  templateUrl: './funcionario-listar.component.html',
  styleUrl: './funcionario-listar.component.scss'
})
export class FuncionarioListarComponent {
  funcionarios: Funcionario[] = [];
  displayedColumns: string[] = ['nome', 'matricula', 'cargo', 'acoes'];

  constructor(private funcionarioService: FuncionarioService, private dialog: MatDialog) {}

  ngOnInit() {
    this.funcionarioService.getFuncionarios().subscribe(funcs => {
      this.funcionarios = funcs.sort((a, b) => a.nome.localeCompare(b.nome));
    });
  }

  excluirFuncionario(id: string, nome: string) {
    const dialogRef = this.dialog.open(ModalConfirmarExclusaoComponent, {
      data: { nome },
    });
    dialogRef.componentInstance.confirmar.subscribe(() => {
      this.funcionarioService.deleteFuncionario(id);
      dialogRef.close();
    });
    dialogRef.componentInstance.cancelar.subscribe(() => {
      dialogRef.close();
    });
  }
}
