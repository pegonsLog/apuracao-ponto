import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { FuncionarioService } from '../../services/funcionario.service';
import { Funcionario } from '../../models/funcionario';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';

// Define o formato de data desejado
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY', // Formato de entrada
  },
  display: {
    dateInput: 'DD/MM/YY', // Formato de exibição
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatMomentDateModule, 
    MatDividerModule,
    MatIconModule,
    MatRadioModule
  ],
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [
    // Fornece o formato de data personalizado para o componente
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class PrincipalComponent implements OnInit {
  tipoImpressao: string = 'geral';
  dataInicio: string = '';
  dataFim: string = '';
  funcionarios$!: Observable<Funcionario[]>;
  funcionarioSelecionadoId: string = '';

  constructor(private router: Router, private authService: AuthService, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.funcionarios$ = this.funcionarioService.getFuncionarios();
  }

  adicionarFuncionario() {
    this.router.navigate(['/funcionarios/novo']);
  }

  listarFuncionarios() {
    this.router.navigate(['/funcionarios']);
  }

  listarUsuarios() {
    this.router.navigate(['/usuarios']);
  }

  logout() {
    this.authService.logout();
  }

  imprimirSelecionado() {
    if (this.dataInicio && this.dataFim && this.funcionarioSelecionadoId) {
      this.router.navigate(['/ocorrencias'], {
        queryParams: { 
          inicio: this.dataInicio, 
          fim: this.dataFim, 
          funcionarioId: this.funcionarioSelecionadoId 
        }
      });
    } else {
      alert('Por favor, preencha o período de datas!');
    }
  }

  imprimirTodos() {
    if (this.dataInicio && this.dataFim) {
      this.router.navigate(['/ocorrencias'], {
        queryParams: { 
          inicio: this.dataInicio, 
          fim: this.dataFim,
          lote: true
        }
      });
    } else {
      alert('Por favor, preencha o período de datas!');
    }
  }
}
