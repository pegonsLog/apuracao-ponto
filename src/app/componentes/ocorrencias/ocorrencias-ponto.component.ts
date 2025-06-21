import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Funcionario } from '../../models/funcionario';
import { FuncionarioService } from '../../services/funcionario.service';
import moment from 'moment';

@Component({
  selector: 'app-ocorrencias-ponto',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule],
  templateUrl: './ocorrencias-ponto.component.html',
  styleUrls: ['./ocorrencias-ponto.component.scss']
})
export class OcorrenciasPontoComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  dataInicio!: string;
  dataFim!: string;
  diasPeriodo: string[] = [];

  constructor(private route: ActivatedRoute, private funcionarioService: FuncionarioService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.dataInicio = params['inicio'];
      this.dataFim = params['fim'];
      const funcionarioId = params['funcionarioId'];
      const isLote = params['lote'] === 'true';

      if (this.dataInicio && this.dataFim) {
        this.diasPeriodo = this.gerarDiasPeriodo(this.dataInicio, this.dataFim);
      }

      if (isLote) {
        this.funcionarioService.getFuncionarios().subscribe(funcionarios => {
          // Ordena a lista de funcionários por cargo e, como desempate, por nome.
          this.funcionarios = funcionarios.sort((a, b) => {
            const cargoA = a.cargo;
            const cargoB = b.cargo;

            // Prioriza funcionários com cargo, colocando os sem cargo no final.
            if (cargoA && !cargoB) return -1;
            if (!cargoA && cargoB) return 1;

            // Se ambos têm cargo, compara os cargos.
            if (cargoA && cargoB) {
              const comparacaoCargo = cargoA.localeCompare(cargoB);
              if (comparacaoCargo !== 0) {
                return comparacaoCargo;
              }
            }

            // Se os cargos são iguais ou ambos nulos, o critério de desempate é o nome.
            return a.nome.localeCompare(b.nome);
          });
        });
      } else if (funcionarioId) {
        this.funcionarioService.getFuncionario(funcionarioId).subscribe(funcionario => {
          this.funcionarios = [funcionario];
        });
      } else {
        console.error('Nenhum funcionário ou lote especificado!');
      }
    });
  }

  gerarDiasPeriodo(inicio: string, fim: string): string[] {
    const dias: string[] = [];
    // Usa moment.js para tratar as datas, evitando problemas de fuso horário.
    let atual = moment(inicio);
    const fimDate = moment(fim);
    const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    while (atual.isSameOrBefore(fimDate, 'day')) {
      const dia = atual.format('D');
      const semana = diasSemana[atual.day()];
      dias.push(`${dia}/${semana}`);
      atual.add(1, 'days');
    }
    return dias;
  }
}
