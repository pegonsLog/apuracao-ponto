import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, setDoc, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { Funcionario } from '../models/funcionario';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FuncionarioService {
  private funcionariosCollection;

  constructor(private firestore: Firestore) {
    this.funcionariosCollection = collection(this.firestore, 'funcionarios');
  }

  getFuncionarios(): Observable<Funcionario[]> {
    return collectionData(this.funcionariosCollection, { idField: 'id' }) as Observable<Funcionario[]>;
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
