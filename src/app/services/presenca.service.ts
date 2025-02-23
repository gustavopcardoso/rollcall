import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresencaService {
  private apiUrl = environment.apiUrl + '/api/Presenca';

  constructor(private http: HttpClient) {}

  confirmarPresenca(emailAluno: string, codigoAula: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/insert', { emailAluno, codigoAula });
  }

  listPresenca(page: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/list?page=' + page);
  }
}
