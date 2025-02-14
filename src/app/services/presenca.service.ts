import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { Presenca } from '../interfaces/presenca';

@Injectable({
  providedIn: 'root'
})
export class PresencaService {
  private apiUrl = environment.apiUrl + 'presenca';

  constructor(private http: HttpClient) {}

  confirmarPresenca(email: string, codigoAula: string): Observable<Presenca> {
    //return this.http.post<Presenca>(this.apiUrl, { email, codigoAula });
    return of({ link: 'https://www.youtube.com/watch?v=JGwWNGJdvx8' });
  }
}
