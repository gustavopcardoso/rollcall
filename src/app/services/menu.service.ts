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
    const userMenu: MenuItem[] = [
      { id: 1, idMenuPai: null, label: 'Alunos', icon: 'face', route: '' },
      { id: 2, idMenuPai: 1, label: 'Gerenciar Alunos', icon: 'list', route: '/aluno/list' },
      { id: 3, idMenuPai: 1, label: 'Importar Alunos', icon: 'open_in_new', route: '/aluno/insert' },
      { id: 4, idMenuPai: null, label: 'Aula', icon: 'assignment', route: '/aluno/list' },
      { id: 5, idMenuPai: 4, label: 'Nova Aula', icon: 'open_in_new', route: '/aula/insert' },
      { id: 6, idMenuPai: null, label: 'Relatorios', icon: 'assessment', route: '/aula/insert' },
      { id: 7, idMenuPai: 6, label: 'Presenças', icon: 'supervised_user_circle', route: '/aula/insert' },
    ];

    return of(userMenu);
  }

  buildMenuHierarchy(menuItems: MenuItem[]): MenuItem[] {
    const menuMap = new Map<number, MenuItem>();

    // Criamos um Map para fácil acesso e definimos os nós raiz
    menuItems.forEach(item => {
      menuMap.set(item.id, { ...item, children: [] });
    });

    // Criamos a estrutura hierárquica
    const rootMenus: MenuItem[] = [];
    menuMap.forEach(item => {
      if (item.idMenuPai === null) {
        rootMenus.push(item);
      } else {
        const parent = menuMap.get(item.idMenuPai);
        parent?.children?.push(item);
      }
    });

    return rootMenus;
  }
}
