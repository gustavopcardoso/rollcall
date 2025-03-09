import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from '../interfaces/aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private apiUrl = environment.apiUrl + '/api/Aluno';

  constructor(private http: HttpClient) {}

  getAlunos(filterValues: any): Observable<Aluno[]> {
    let params = new HttpParams();

    if (filterValues.nome) params = params.set('nome', filterValues.nome);
    if (filterValues.email) params = params.set('email', filterValues.email);
    if (filterValues.empresa) params = params.set('empresa', filterValues.empresa);
    if (filterValues.produto) params = params.set('produto', filterValues.produto);
    if (filterValues.finalContratoInicio) params = params.set('finalContratoInicio', filterValues.finalContratoInicio);
    if (filterValues.finalContratoFim) params = params.set('finalContratoFim', filterValues.finalContratoFim);    
    if (filterValues.ativo != undefined) params = params.set('ativo', filterValues.ativo);    
    
    return this.http.get<Aluno[]>(this.apiUrl + '/list', { params });
  }

  getAluno(id: number): Observable<Aluno> {
    return this.http.get<Aluno>(this.apiUrl + '/' + id);
  }

  saveAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl + '/edit', aluno);
  }

  insertAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.apiUrl + '/insert', aluno);
  }
}
