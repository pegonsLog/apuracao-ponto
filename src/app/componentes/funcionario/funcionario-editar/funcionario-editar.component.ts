import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FuncionarioService } from '../../../services/funcionario.service';
import { Funcionario } from '../../../models/funcionario';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionario-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './funcionario-editar.component.html',
  styleUrl: './funcionario-editar.component.scss'
})
export class FuncionarioEditarComponent implements OnInit {
  funcionario: Funcionario = { nome: '', cargo: '' };
  id: string = '';

  constructor(
    private funcionarioService: FuncionarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    this.funcionarioService.getFuncionarios().subscribe(funcs => {
      const found = funcs.find(f => f.id === this.id);
      if (found) this.funcionario = { ...found };
    });
  }

  atualizarFuncionario() {
    if (this.funcionario.nome && this.funcionario.cargo) {
      this.funcionarioService.updateFuncionario(this.id, this.funcionario);
      this.router.navigate(['/funcionarios']);
    }
  }
}
