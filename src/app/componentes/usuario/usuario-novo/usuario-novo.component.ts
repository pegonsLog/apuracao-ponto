import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-novo',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './usuario-novo.component.html',
  styleUrls: ['./usuario-novo.component.scss']
})
export class UsuarioNovoComponent {
  usuario: Usuario = { usuario: '', nome: '', senha: '' };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  async salvarUsuario(): Promise<void> {
    if (this.usuario.usuario && this.usuario.senha && this.usuario.nome) {
      try {
        await this.usuarioService.addUsuario(this.usuario);
        console.log('Usuário salvo com sucesso');
        this.router.navigate(['/usuarios']);
      } catch (error) {
        console.error('Erro ao salvar usuário', error);
      }
    }
  }
}
