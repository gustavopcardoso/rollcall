import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { FileUploadService } from '../../../services/file-upload.service';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-aluno',
  standalone: true,
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatIcon,
    CommonModule
  ],
  templateUrl: './insert-aluno.component.html',
  styleUrls: ['./insert-aluno.component.css']
})
export class InsertAlunoComponent {
  selectedFile!: File | null;
  uploadSuccess = false;
  uploadError = '';

  constructor(private fileUploadService: FileUploadService, private snackBar: MatSnackBar) {}

  onFileChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (!inputElement.files?.length) return;

    this.selectedFile = inputElement.files[0];
  }

  uploadFile() {
    if (!this.selectedFile) {
      console.error('Nenhum arquivo selecionado!');
      return;
    }

    this.uploadSuccess = false;
    this.uploadError = '';

    this.fileUploadService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploadSuccess = true;
        this.snackBar.open('Arquivo enviado com sucesso!', 'Fechar', { duration: 3000 });
        this.selectedFile = null;
      },
      error: (err) => {
        this.uploadError = err.error?.message || 'Erro ao enviar arquivo';
      }
    });
  }

  limparArquivo() {
    this.selectedFile = null;
    this.uploadError = '';
    this.uploadSuccess = false;
  }
}
