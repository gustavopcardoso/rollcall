import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MenuComponent } from '../../menu/menu.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AulaService } from '../../../services/aula.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { combineDateAndTime, getDateWithoutTimeZone } from '../../../helpers/date.helper';

@Component({
  selector: 'app-edit-aula',
  standalone: true,
  imports: [
      CommonModule,
      MatInputModule,
      MatButtonModule,
      MatFormFieldModule,
      MatCardModule,
      MenuComponent,
      ReactiveFormsModule,
      MatProgressSpinnerModule,
      MatDatepickerModule,
      MatNativeDateModule,
      MatTimepickerModule
  ],
  templateUrl: './edit-aula.component.html',
  styleUrl: './edit-aula.component.css'
})
export class EditAulaComponent implements OnInit {
  aulaForm: FormGroup;
  loading = false;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private aulaService: AulaService,
    private snackBar: MatSnackBar
  ) {
      this.aulaForm = this.fb.group({
        id: [],
        titulo: ['', Validators.required],
        link: ['', [Validators.required, Validators.pattern(/https?:\/\/.*/)]],        
        data: ['', Validators.required],
        dataHora: ['', Validators.required],
        tutor: ['', Validators.required],
        produto: ['', Validators.required],
        observacao: [null]
    });
  }

  ngOnInit() {
    const aulaId = this.route.snapshot.paramMap.get('id');
    if (aulaId) {
      this.aulaService.getAula(Number(aulaId)).subscribe({
        next: (dados) => {
          this.aulaForm.patchValue(dados)
          const dataHora = new Date(dados.dataHora);
          this.aulaForm.patchValue({
            data: dataHora
          });          
        },
        
        error: () => this.snackBar.open('Erro ao carregar os dados da aula.', 'Fechar', { duration: 3000 })
      });
    }
  }

  onSubmit() {
    if (this.aulaForm.invalid) {
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const formValue = this.aulaForm.value;
    const dataHora = combineDateAndTime(formValue.data, new Date(formValue.dataHora));
    if (dataHora) {
      this.aulaForm.value.dataHora = getDateWithoutTimeZone(dataHora);
    }

    this.aulaService.saveAula(this.aulaForm.value).subscribe({
      next: () => {
        this.snackBar.open('Aula alterada com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: () => {        
        this.snackBar.open('Erro ao alterar aula', 'Fechar', { duration: 3000 });
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/aula/list']);
  }
}
