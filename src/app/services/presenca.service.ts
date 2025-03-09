import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PresencaService {
  private apiUrl = environment.apiUrl + '/api/Presenca';

  constructor(private http: HttpClient) {}

  confirmarPresenca(emailRegistrado: string, codigoAula: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/insert', { emailRegistrado, codigoAula });
  }

  listPresenca(filterValues: any): Observable<any> {
    let params = new HttpParams();

    if (filterValues.titulo) params = params.set('tituloAula', filterValues.titulo);
    if (filterValues.produto) params = params.set('produto', filterValues.produto);
    if (filterValues.tutor) params = params.set('tutor', filterValues.tutor);
    if (filterValues.dataHoraInicio) params = params.set('dataHoraInicio', filterValues.dataHoraInicio);
    if (filterValues.dataHoraFim) params = params.set('dataHoraFim', filterValues.dataHoraFim);

    return this.http.get<any>(this.apiUrl + '/list', { params });
  }
}
