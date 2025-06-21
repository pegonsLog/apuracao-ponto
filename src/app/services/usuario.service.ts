import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc, query, orderBy, docData, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  private usuariosCollection;

  constructor(private firestore: Firestore) {
    this.usuariosCollection = collection(this.firestore, 'usuarios');
  }

  getUsuarios(): Observable<Usuario[]> {
    const q = query(this.usuariosCollection, orderBy('usuario'));
    return collectionData(q, { idField: 'id' }) as Observable<Usuario[]>;
  }

  getUsuario(id: string): Observable<Usuario> {
    const usuarioDocument = doc(this.firestore, `usuarios/${id}`);
    return docData(usuarioDocument, { idField: 'id' }) as Observable<Usuario>;
  }

  addUsuario(usuario: Usuario) {
    const newDoc = doc(this.usuariosCollection);
    return setDoc(newDoc, { ...usuario, id: newDoc.id });
  }

  updateUsuario(id: string, usuario: Partial<Usuario>) {
    const usuarioDoc = doc(this.usuariosCollection, id);
    return updateDoc(usuarioDoc, usuario);
  }

  deleteUsuario(id: string) {
    const usuarioDoc = doc(this.usuariosCollection, id);
    return deleteDoc(usuarioDoc);
  }
}
