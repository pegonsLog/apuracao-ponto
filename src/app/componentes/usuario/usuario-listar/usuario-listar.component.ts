import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { ConfirmacaoDialogComponent, DialogData } from '../../dialogs/confirmacao-dialog/confirmacao-dialog.component';

@Component({
  selector: 'app-usuario-listar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDialogModule
  ],
  templateUrl: './usuario-listar.component.html',
  styleUrls: ['./usuario-listar.component.scss']
})
export class UsuarioListarComponent implements OnInit {
  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['usuario', 'nome', 'senha', 'acoes'];

  constructor(private usuarioService: UsuarioService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
    });
  }

  excluirUsuario(id: string, nome: string): void {
    const dialogData: DialogData = {
      titulo: 'Confirmar Exclusão',
      mensagem: `Tem certeza que deseja excluir o usuário ${nome}?`
    };

    const dialogRef = this.dialog.open(ConfirmacaoDialogComponent, {
      width: '350px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deleteUsuario(id);
      }
    });
  }
}
