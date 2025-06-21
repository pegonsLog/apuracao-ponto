import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-funcionario-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './funcionario-novo.component.html',
  styleUrl: './funcionario-novo.component.scss'
})
export class FuncionarioNovoComponent {
  funcionario: Funcionario = { nome: '', cargo: '', matricula: '' };

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  async salvarFuncionario(): Promise<void> {
    if (this.funcionario.nome && this.funcionario.cargo) {
      try {
        await this.funcionarioService.addFuncionario(this.funcionario);
        console.log('Funcionário salvo com sucesso');
        this.router.navigate(['/funcionarios']);
      } catch (error) {
        console.error('Erro ao salvar funcionário', error);
      }
    }
  }
}
