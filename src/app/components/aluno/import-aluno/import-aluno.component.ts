import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadService } from '../../../services/file-upload.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-import-aluno',
  standalone: true,
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatInputModule,
    MatIcon,
    CommonModule,
    MatProgressSpinnerModule,    
    MatButtonModule    
  ],
  templateUrl: './import-aluno.component.html',
  styleUrl: './import-aluno.component.css'
})
export class ImportAlunoComponent {  
  selectedFile!: File | null;
  uploadSuccess = false;
  uploadError = '';
  loading = false;

  constructor(
    private fileUploadService: FileUploadService, 
    private snackBar: MatSnackBar
  ) {}

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files?.length) 
      return;

    this.selectedFile = inputElement.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado!');
      return;
    }

    this.loading = true;
    this.uploadSuccess = false;
    this.uploadError = '';

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: () => {        
        this.uploadSuccess = true;
        this.snackBar.open('Arquivo enviado com sucesso!', 'Fechar', { duration: 3000 });
        this.selectedFile = null;        ;
      },
      error: (err) => {        
        this.uploadError = err.error?.message || 'Erro ao enviar arquivo';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  limparArquivo(fileInput?: HTMLInputElement) {
    this.selectedFile = null;
    this.uploadError = '';
    this.uploadSuccess = false;

    if (fileInput) {
      fileInput.value = '';
    }
  }

  async downloadFileModel() {
    await this.fileUploadService.downloadFileModel();
  }
}
