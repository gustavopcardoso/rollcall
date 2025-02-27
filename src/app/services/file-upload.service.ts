import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { saveAs } from 'file-saver';
import { Workbook } from 'exceljs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private apiUrl = environment.apiUrl + '/api/Aluno';

  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.apiUrl + '/insert-file', formData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Erro no upload:', error);
    return throwError(() => new Error('Falha no envio do arquivo. Tente novamente.'));
  }

  async downloadFileModel() {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet('alunos');

    worksheet.columns = [
      { header: 'Nome', key: 'nome', width: 25 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Empresa', key: 'empresa', width: 25 },
      { header: 'Final Contrato', key: 'finalContrato', width: 25 },
      { header: 'Produto', key: 'produto', width: 25 },
      { header: 'CS Responsável', key: 'csResponsavel', width: 25 },
      { header: 'Tutor', key: 'tutor', width: 25 },
      { header: 'Codigo', key: 'codigo', width: 25 },
    ];

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'alunos.xlsx');
  }
}
