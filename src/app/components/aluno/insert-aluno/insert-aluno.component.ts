import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Router } from '@angular/router';
import { AlunoService } from '../../../services/aluno.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-insert-aluno',
  standalone: true,
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatInputModule,
    CommonModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatSnackBarModule
  ],
  templateUrl: './insert-aluno.component.html',
  styleUrls: ['./insert-aluno.component.css']
})
export class InsertAlunoComponent {
  alunoForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private alunoService: AlunoService,
    private snackBar: MatSnackBar
  ) {
    this.alunoForm = this.initializeForm();
  }

  initializeForm() : FormGroup {
    return this.alunoForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
      empresa: ['', Validators.required],
      codigo: [null],
      produto: ['', Validators.required],
      finalContrato: [null],
      csResponsavel: ['', Validators.required],
      tutor: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.alunoForm.invalid) {
      return;
    }

    this.loading = true;

    this.alunoService.insertAluno(this.alunoForm.value).subscribe({
      next: () => {  
        this.snackBar.open('Aluno cadastrado com sucesso!', 'Fechar', { duration: 3000 });        
        this.alunoForm.reset();

        // Workaround to clear form validation
        Object.keys(this.alunoForm.controls).forEach(key => {
          this.alunoForm.controls[key].setErrors(null)
        });
      },
      error: (err) => {
        this.snackBar.open(err.error?.message ?? 'Erro ao cadastrar aluno', 'Fechar', { duration: 3000 });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onClear() {
    this.alunoForm.reset();
  }

  onCancel() {
    this.router.navigate(['/aluno/list']);
  }
}
