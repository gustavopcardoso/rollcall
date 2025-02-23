import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aula } from '../interfaces/aula';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private apiUrl = environment.apiUrl + '/api/Aula';

  constructor(private http: HttpClient) {}

  insertAula(aula: Aula): Observable<any> {
    return this.http.post<any>(this.apiUrl, aula).pipe(
      catchError(error => {
        console.error('Erro ao cadastrar aula:', error);
        return throwError(() => new Error(error));
      })
    );
  }

  getAulas(): Observable<Aula[]> {
    return this.http.get<Aula[]>(this.apiUrl + '/list');
  }

  getAula(id: number): Observable<Aula> {
    return this.http.get<Aula>(this.apiUrl + '/' + id);
  }

  saveAula(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(this.apiUrl + '/edit', aula);
  }
}
