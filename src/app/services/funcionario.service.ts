import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, updateDoc, deleteDoc, addDoc, query, orderBy, docData, setDoc } from '@angular/fire/firestore';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private funcionariosCollection;

  constructor(private firestore: Firestore) {
    this.funcionariosCollection = collection(this.firestore, 'funcionarios');
  }

  getFuncionarios(): Observable<Funcionario[]> {
    const q = query(this.funcionariosCollection, orderBy('nome'));
    return collectionData(q, { idField: 'id' }) as Observable<Funcionario[]>;
  }

  getFuncionario(id: string): Observable<Funcionario> {
    const funcionarioDocument = doc(this.firestore, `funcionarios/${id}`);
    return docData(funcionarioDocument, { idField: 'id' }) as Observable<Funcionario>;
  }

  addFuncionario(funcionario: Funcionario) {
    const newDoc = doc(this.funcionariosCollection);
    return setDoc(newDoc, funcionario);
  }

  updateFuncionario(id: string, funcionario: Partial<Funcionario>) {
    const funcionarioDoc = doc(this.funcionariosCollection, id);
    return updateDoc(funcionarioDoc, funcionario);
  }

  deleteFuncionario(id: string) {
    const funcionarioDoc = doc(this.funcionariosCollection, id);
    return deleteDoc(funcionarioDoc);
  }
}
