import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Aula } from '../interfaces/aula';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private apiUrl = environment.apiUrl + '/api/Aula';

  constructor(private http: HttpClient) {}

  insertAula(aula: Aula): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/insert', aula).pipe(
      catchError(error => {
        console.error('Erro ao cadastrar aula:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getAula(id: number): Observable<Aula> {
    let params = new HttpParams();

    if (id) params = params.set('id', id.toString());

    return this.http.get<Aula>(`${this.apiUrl}/list`, { params });
  }

  getAulas(filterValues: any): Observable<Aula[]> {
    let params = new HttpParams();

    if (filterValues.titulo) params = params.set('titulo', filterValues.titulo);
    if (filterValues.tutor) params = params.set('tutor', filterValues.tutor);
    if (filterValues.dataHoraInicio) params = params.set('dataHoraInicio', filterValues.dataHoraInicio);
    if (filterValues.dataHoraFim) params = params.set('dataHoraFim', filterValues.dataHoraFim);

    return this.http.get<Aula[]>(`${this.apiUrl}/list`, { params });
  }

  saveAula(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(this.apiUrl + '/edit', aula);
  }
}
