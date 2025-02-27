import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Aula } from '../../../interfaces/aula';
import { AulaService } from '../../../services/aula.service';
import { MenuComponent } from "../../menu/menu.component";
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { Clipboard } from '@angular/cdk/clipboard';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { combineDateAndTime, getDateWithoutTimeZone } from '../../../helpers/date.helper';

@Component({
  selector: 'app-list-aula',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatSnackBarModule,
    MenuComponent,
    ReactiveFormsModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
],
  templateUrl: './list-aula.component.html',
  styleUrl: './list-aula.component.css'
})
export class ListAulaComponent {
  loading = false;
  showResults = false;
  displayedColumns: string[];
  dataSource = new MatTableDataSource<Aula>();
  aulaFilterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,  
    private aulaService: AulaService, 
    private clipboard: Clipboard, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.aulaFilterForm = this.initializeForm();
    this.displayedColumns = this.initializeColumns();
  }

  copyLink(link: string) {
    this.clipboard.copy(link);
    this.snackBar.open('Link copiado!', 'Fechar', { duration: 3000 });
  }

  editAula(aula: Aula) {
    this.router.navigate(['/aula/edit/', aula.id]);
  }

  initializeForm() : FormGroup {
    return this.fb.group({
      titulo: [''],
      tutor: [''],
      produto: [''],
      dataInicio: [''],
      dataHoraInicio: [''],
      dataFim: [''],
      dataHoraFim: [''],
    });
  }

  initializeColumns() : string[] {
    return [
      'titulo',
      'tutor',
      'produto',
      'dataHora',
      'observacao',
      'acao',
      'editar'];
  }

  onSubmit() {
    const formValue = this.aulaFilterForm.value;
    const dataInicio = combineDateAndTime(formValue.dataInicio, formValue.dataHoraInicio, true);
    const dataFim = combineDateAndTime(formValue.dataFim, formValue.dataHoraFim);

    const filterValues = {
      titulo: formValue.titulo,
      tutor: formValue.tutor,
      produto: formValue.produto,
      dataHoraInicio: dataInicio ? getDateWithoutTimeZone(dataInicio) : null,
      dataHoraFim: dataFim ? getDateWithoutTimeZone(dataFim) : null
    };

    this.getAulas(filterValues);
  }  

  getAulas(filterValues: any) {
    this.loading = true;
    this.aulaService.getAulas(filterValues).subscribe({
      next: (aulas) => {
        this.dataSource.data = aulas;
        this.showResults = true;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onClear() {
    this.aulaFilterForm.reset();
  }

  newAula() {
    this.router.navigate(['/aula/insert']);
  }
}
