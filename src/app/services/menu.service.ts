import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { MenuItem } from '../interfaces/menu-item';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private apiUrl = environment.apiUrl + 'menu';

  constructor(private http: HttpClient) {}

  getMenuItems(): Observable<MenuItem[]> {
    //this.http.get<MenuItem[]>(`${this.apiUrl}`);
    const userMenu: MenuItem[] = [
      { id: 1, idMenuPai: null, label: 'Alunos', icon: 'face', route: '' },
      { id: 2, idMenuPai: 1, label: 'Gerenciar Alunos', icon: 'list', route: '/aluno/list' },
      { id: 3, idMenuPai: 1, label: 'Importar Alunos', icon: 'open_in_new', route: '/aluno/import' },
      { id: 4, idMenuPai: null, label: 'Aulas', icon: 'assignment', route: '' },
      { id: 5, idMenuPai: 4, label: 'Gerenciar Aulas', icon: 'list', route: '/aula/list' },
      { id: 7, idMenuPai: null, label: 'Relatorios', icon: 'assessment', route: '' },
      { id: 8, idMenuPai: 7, label: 'Presenças', icon: 'supervised_user_circle', route: '/presenca/list' },
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
