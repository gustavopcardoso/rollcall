import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from '../interfaces/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = environment.apiUrl + '/api/Aluno';

  constructor(private http: HttpClient) {}

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.apiUrl + '/list');
  }

  getAluno(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(this.apiUrl + '/' + id);
  }

  saveAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl + '/edit', aluno);
  }
}
