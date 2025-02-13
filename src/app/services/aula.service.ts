import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Aula } from '../interfaces/aula';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private apiUrl = environment.apiUrl + 'aula/insert';

  constructor(private http: HttpClient) {}

  insertAula(aula: Aula): Observable<Aula> {
    return this.http.post<Aula>(this.apiUrl, aula).pipe(
      catchError(error => {
        console.error('Erro ao cadastrar aula:', error);
        return throwError(() => new Error(error));
      })
    );
  }
}
