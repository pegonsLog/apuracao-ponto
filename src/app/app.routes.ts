import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'funcionarios' },
  {
    path: 'funcionarios',
    children: [
      { path: '', loadComponent: () => import('./componentes/funcionario/funcionario-listar/funcionario-listar.component').then(m => m.FuncionarioListarComponent) },
      { path: 'novo', loadComponent: () => import('./componentes/funcionario/funcionario-novo/funcionario-novo.component').then(m => m.FuncionarioNovoComponent) },
      { path: 'editar/:id', loadComponent: () => import('./componentes/funcionario/funcionario-editar/funcionario-editar.component').then(m => m.FuncionarioEditarComponent) }
    ]
  }
];
