import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from './usuario.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly IS_LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  async login(username: string, password: string): Promise<boolean> {
    const usuarios = await firstValueFrom(this.usuarioService.getUsuarios());
    const usuario = usuarios.find(u => u.usuario === username && u.senha === password);

    if (usuario) {
      localStorage.setItem(this.IS_LOGGED_IN_KEY, 'true');
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem(this.IS_LOGGED_IN_KEY);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem(this.IS_LOGGED_IN_KEY) === 'true';
  }
}
