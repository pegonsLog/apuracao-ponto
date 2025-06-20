import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';

@Component({
  selector: 'app-funcionario-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './funcionario-novo.component.html',
  styleUrl: './funcionario-novo.component.scss'
})
export class FuncionarioNovoComponent {
  funcionario: Funcionario = { nome: '', cargo: '' };

  constructor(private funcionarioService: FuncionarioService) {}

  salvarFuncionario() {
    if (this.funcionario.nome && this.funcionario.cargo) {
      this.funcionarioService.addFuncionario(this.funcionario);
    }
  }
}
