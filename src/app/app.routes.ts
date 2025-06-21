import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./componentes/login/login.component').then(m => m.LoginComponent) },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'principal',
    loadComponent: () => import('./componentes/principal/principal.component').then(m => m.PrincipalComponent),
    canActivate: [authGuard]
  },
  {
    path: 'funcionarios',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./componentes/funcionario/funcionario-listar/funcionario-listar.component').then(m => m.FuncionarioListarComponent) },
      { path: 'novo', loadComponent: () => import('./componentes/funcionario/funcionario-novo/funcionario-novo.component').then(m => m.FuncionarioNovoComponent) },
      { path: 'editar/:id', loadComponent: () => import('./componentes/funcionario/funcionario-editar/funcionario-editar.component').then(m => m.FuncionarioEditarComponent) }
    ]
  },
  {
    path: 'usuarios',
    canActivate: [authGuard],
    children: [
      { path: '', loadComponent: () => import('./componentes/usuario/usuario-listar/usuario-listar.component').then(m => m.UsuarioListarComponent) },
      { path: 'novo', loadComponent: () => import('./componentes/usuario/usuario-novo/usuario-novo.component').then(m => m.UsuarioNovoComponent) },
      { path: 'editar/:id', loadComponent: () => import('./componentes/usuario/usuario-editar/usuario-editar.component').then(m => m.UsuarioEditarComponent) }
    ]
  },
  {
    path: 'ocorrencias',
    loadComponent: () => import('./componentes/ocorrencias/ocorrencias-ponto.component').then(m => m.OcorrenciasPontoComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '/login' } // Redireciona rotas não encontradas para o login
];
