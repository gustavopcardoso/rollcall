import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../../../services/aluno.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-edit-aluno',
  standalone: true,
  imports: [
    CommonModule,    
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MenuComponent,
    ReactiveFormsModule,    
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
],
  templateUrl: './edit-aluno.component.html',
  styleUrls: ['./edit-aluno.component.css']
})
export class EditAlunoComponent implements OnInit {
  alunoForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alunoService: AlunoService,
    private snackBar: MatSnackBar
  ) {
      this.alunoForm = this.fb.group({
        id: [],
        nome: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        empresa: ['', Validators.required],
        finalContrato: ['', Validators.required],
        produto: ['', Validators.required],
        ativo: ['']
    });
  }

  ngOnInit() {
    const alunoId = this.route.snapshot.paramMap.get('id');
    if (alunoId) {
      this.alunoService.getAluno(Number(alunoId)).subscribe({
        next: (dados) => this.alunoForm.patchValue(dados),
        // Exibir mensagem de erro estilo a utilizada no login
        error: () => console.error('Erro ao carregar os dados do aluno.')
      });
    }
  }

  onSubmit() {
    if (this.alunoForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.alunoService.saveAluno(this.alunoForm.value).subscribe({
      next: () => {
        this.snackBar.open('Aluno alterado com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Erro ao alterar aluno';
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/aluno/list']);
  }
}
