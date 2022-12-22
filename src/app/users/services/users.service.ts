import { Injectable } from '@angular/core';
import { State } from '../models/state.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  public saveUser(user: User): void {
    user = {
      ...user,
      id: crypto.randomUUID(),
      address: {
        ...user.address,
        id: crypto.randomUUID(),
      }
    }

    const users = this.listUsers();
    users.push(user);
    localStorage.setItem('USERS', JSON.stringify(users))
  }

  public listUsers(): User[] {
    return JSON.parse(localStorage.getItem('USERS') || '[]');
  }

  deleteUser(userId: string): void {
    const users = this.listUsers();
    const indexToRemove = users.findIndex( user => user.id === userId);
    if(indexToRemove < 0 ) {
      return
    }
    users.splice(indexToRemove, 1);
    localStorage.setItem('USERS', JSON.stringify(users));
  }

  public getUserById(userId: string): User {
    const users = this.listUsers();
    return users.find(user => user.id === userId) as User;
  }

  public updateUser(user: User): boolean {
    const users = this.listUsers();
    const index = users.findIndex(u => u.id === user.id);
    if (!index) return false;
    users[index] = user;
    localStorage.setItem('USERS', JSON.stringify(users))
    return true;
  }

  getStatesOfBrazil(): State[]{
    return [
      { nome: 'Acre', sigla: 'AC' },
      { nome: 'Alagoas', sigla: 'AL' },
      { nome: 'Amapá', sigla: 'AP' },
      { nome: 'Amazonas', sigla: 'AM' },
      { nome: 'Bahia', sigla: 'BA' },
      { nome: 'Ceará', sigla: 'CE' },
      { nome: 'Distrito Federal', sigla: 'DF' },
      { nome: 'Espírito Santo', sigla: 'ES' },
      { nome: 'Goiás', sigla: 'GO' },
      { nome: 'Maranhão', sigla: 'MA' },
      { nome: 'Mato Grosso', sigla: 'MT' },
      { nome: 'Mato Grosso do Sul', sigla: 'MS' },
      { nome: 'Minas Gerais', sigla: 'MG' },
      { nome: 'Pará', sigla: 'PA' },
      { nome: 'Paraíba', sigla: 'PB' },
      { nome: 'Paraná', sigla: 'PR' },
      { nome: 'Pernambuco', sigla: 'PE' },
      { nome: 'Piauí', sigla: 'PI' },
      { nome: 'Rio de Janeiro', sigla: 'RJ' },
      { nome: 'Rio Grande do Norte', sigla: 'RN' },
      { nome: 'Rio Grande do Sul', sigla: 'RS' },
      { nome: 'Rondônia', sigla: 'RO' },
      { nome: 'Roraima', sigla: 'RR' },
      { nome: 'Santa Catarina', sigla: 'SC' },
      { nome: 'São Paulo', sigla: 'SP' },
      { nome: 'Sergipe', sigla: 'SE' },
      { nome: 'Tocantins', sigla: 'TO' },
    ];
  }

}
