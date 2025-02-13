import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = environment.apiUrl + 'menu'; // 🔹 URL da API que retorna os menus

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    //this.http.get<MenuItem[]>(`${this.apiUrl}`);
    const adminMenu: MenuItem[] = [
      { label: 'Usuários', icon: 'people', route: '/users' },
      { label: 'Configurações', icon: 'settings', route: '/settings' },
    ];

    const userMenu: MenuItem[] = [
      { label: 'Lista de Alunos', icon: 'list', route: '/aluno/list' },
      { label: 'Inserir Alunos', icon: 'face', route: '/aluno/insert' },
      { label: 'Inserir Aula', icon: 'assignment', route: '/aula/insert' },
    ];

    return of(userMenu);
  }
}
