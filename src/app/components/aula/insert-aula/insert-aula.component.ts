import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AulaService } from '../../../services/aula.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-insert-aula',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MenuComponent,
    MatTimepickerModule,
    MatProgressSpinnerModule,
    MatIconModule
],
  templateUrl: './insert-aula.component.html',
  styleUrl: './insert-aula.component.css'
})
export class InsertAulaComponent {
  aulaForm: FormGroup;
  loading = false;
  errorMessage: string = '';
  linkAula: string = '';

  constructor(
    private fb: FormBuilder,
    private aulaService: AulaService,
    private clipboard: Clipboard, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.aulaForm = this.fb.group({
      titulo: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/https?:\/\/.*/)]],
      data: ['', Validators.required],
      dataHora: ['', Validators.required],
      tutor: ['', Validators.required],
      observacao: ['']
    });
  }

  onSubmit() {
    if (this.aulaForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.aulaService.insertAula(this.aulaForm.value).subscribe({
      next: (res) => {
        this.linkAula = res.linkAula;
        this.snackBar.open('Aula cadastrada com sucesso!', 'Fechar', { duration: 3000 });
        this.aulaForm.reset();

        // Workaround to clear form validation
        Object.keys(this.aulaForm.controls).forEach(key => {
          this.aulaForm.controls[key].setErrors(null)
        });
      },
      error: () => {        
        this.snackBar.open('Erro ao cadastrar aluno', 'Fechar', { duration: 3000 });
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onClear() {
    this.aulaForm.reset();
    this.errorMessage = '';
  }

  onCancel() {
    this.router.navigate(['/aula/list']);
  }

  copyLink(link: string) {
    this.clipboard.copy(link);
    this.snackBar.open('Link copiado!', 'Fechar', { duration: 3000 });
  }
}
