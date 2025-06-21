import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-usuario-editar',
  standalone: true,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatCardModule, MatIconModule],
  templateUrl: './usuario-editar.component.html',
  styleUrls: ['./usuario-editar.component.scss']
})
export class UsuarioEditarComponent implements OnInit {
  usuario: Usuario = { usuario: '', nome: '', senha: '' };
  id: string = '';

  constructor(
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '';
    if (this.id) {
      this.usuarioService.getUsuario(this.id).subscribe(usuario => {
        this.usuario = usuario;
        this.usuario.senha = ''; // Limpa a senha por segurança
      });
    }
  }

  async atualizarUsuario(): Promise<void> {
    if (this.id && this.usuario.usuario) {
      const dadosAtualizar: Partial<Usuario> = {
        usuario: this.usuario.usuario,
        nome: this.usuario.nome
      };

      if (this.usuario.senha) {
        dadosAtualizar.senha = this.usuario.senha;
      }

      try {
        await this.usuarioService.updateUsuario(this.id, dadosAtualizar);
        console.log('Usuário atualizado com sucesso');
        this.router.navigate(['/usuarios']);
      } catch (error) {
        console.error('Erro ao atualizar usuário', error);
      }
    }
  }
}
