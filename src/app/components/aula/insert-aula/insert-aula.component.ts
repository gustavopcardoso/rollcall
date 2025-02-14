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
    MenuComponent
],
  templateUrl: './insert-aula.component.html',
  styleUrl: './insert-aula.component.css'
})
export class InsertAulaComponent {
  aulaForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private aulaService: AulaService,
    private snackBar: MatSnackBar
  ) {
    this.aulaForm = this.fb.group({
      titulo: ['', Validators.required],
      link: ['', [Validators.required, Validators.pattern(/https?:\/\/.*/)]],
      dataHora: ['', Validators.required],
      tutor: ['', Validators.required],
      observacoes: [''],
      dataHoraEnvio: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.aulaForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.aulaService.insertAula(this.aulaForm.value).subscribe({
      next: () => {
        this.snackBar.open('Aula cadastrada com sucesso!', 'Fechar', { duration: 3000 });
        this.aulaForm.reset();
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao cadastrar aula';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  clearForm() {
    this.aulaForm.reset();
    this.errorMessage = '';
  }

}
