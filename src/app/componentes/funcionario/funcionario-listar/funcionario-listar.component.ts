import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { ConfirmacaoDialogComponent, DialogData } from '../../dialogs/confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-funcionario-listar',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, MatCardModule],
  templateUrl: './funcionario-listar.component.html',
  styleUrl: './funcionario-listar.component.scss'
})
export class FuncionarioListarComponent {
  funcionarios: Funcionario[] = [];
  displayedColumns: string[] = ['nome', 'matricula', 'cargo', 'acoes'];

  constructor(private funcionarioService: FuncionarioService, private dialog: MatDialog) {}

  ngOnInit() {
    this.funcionarioService.getFuncionarios().subscribe(funcs => {
      this.funcionarios = funcs.sort((a, b) => {
        const cargoA = a.cargo;
        const cargoB = b.cargo;

        if (cargoA && !cargoB) return -1;
        if (!cargoA && cargoB) return 1;

        if (cargoA && cargoB) {
          const comparacaoCargo = cargoA.localeCompare(cargoB);
          if (comparacaoCargo !== 0) {
            return comparacaoCargo;
          }
        }

        return a.nome.localeCompare(b.nome);
      });
    });
  }

  excluirFuncionario(id: string, nome: string) {
    const dialogData: DialogData = {
      titulo: 'Confirmar Exclusão',
      mensagem: `Tem certeza que deseja excluir o funcionário ${nome}?`
    };

    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.funcionarioService.deleteFuncionario(id);
      }
    });
  }
}
