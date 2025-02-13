import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from '../interfaces/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = environment.apiUrl + 'aluno/list';

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    
    return of([
      { id: 1, nome: 'João Silva', ativo: true },
      { id: 2, nome: 'Maria Souza', ativo: false },
      { id: 3, nome: 'Carlos Mendes', ativo: true },
      { id: 4, nome: 'Ana Lima', ativo: false },
      { id: 4, nome: 'Botelho Pinto', ativo: true }
    ]);

    // return this.http.get<Aluno[]>(this.apiUrl);
  }
}
