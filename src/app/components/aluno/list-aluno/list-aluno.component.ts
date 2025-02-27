import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MatCard, MatCardModule, MatCardTitle } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'; 
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Aluno } from '../../../interfaces/aluno';
import { MatSort } from '@angular/material/sort';
import { AlunoService } from '../../../services/aluno.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { combineDateAndTime, getDateWithoutTimeZone } from '../../../helpers/date.helper';

@Component({
  selector: 'app-list-aluno',
  standalone: true,
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatTableModule,
    MatIcon,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule,
    ReactiveFormsModule,    
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule
  ],
  templateUrl: './list-aluno.component.html',
  styleUrl: './list-aluno.component.css'
})
export class ListAlunoComponent implements AfterViewInit {
  loading = false;
  showResults = false;
  displayedColumns: string[];
  dataSource = new MatTableDataSource<Aluno>();
  alunoFilterForm: FormGroup;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,    
    private alunoService: AlunoService, 
    private router: Router) 
  {
    this.alunoFilterForm = this.initializeForm();
    this.displayedColumns = this.initializeColumns();
  }   

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
 
  getAlunos(filterValues: any) {
    this.loading = true;
    this.alunoService.getAlunos(filterValues).subscribe({
      next: (alunos) => {
        this.dataSource.data = alunos;
        this.dataSource.paginator = this.paginator;
        this.showResults = true;
      },
      error: () => {
        this.showResults = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  editAluno(aluno: Aluno) {
    this.router.navigate(['/aluno/edit/', aluno.id]);
  }

  onClear() {
    this.alunoFilterForm.reset();
  }

  onSubmit() {
    const formValue = this.alunoFilterForm.value;
    const dataFinalContratoInicio = combineDateAndTime(formValue.finalContratoInicio, null, true);
    const dataFinalContratoFim = combineDateAndTime(formValue.finalContratoFim, null, false);

    const filterValues = {
      nome: formValue.nome,
      email: formValue.email,
      empresa: formValue.empresa,
      produto: formValue.produto,
      finalContratoInicio: dataFinalContratoInicio ? getDateWithoutTimeZone(dataFinalContratoInicio) : null,
      finalContratoFim: dataFinalContratoFim ? getDateWithoutTimeZone(dataFinalContratoFim) : null
    };
    this.getAlunos(filterValues);
  }

  initializeForm() : FormGroup {
    return this.fb.group({
      nome: [''],
      email: [''],
      empresa: [''],
      produto: [''],
      finalContratoInicio: [''],
      finalContratoFim: ['']
    });
  }

  initializeColumns() : string[] {
    return [
      'nome', 
      'email',
      'empresa',
      'finalContrato',
      'produto',
      'ativo', 
      'editar'];
  }

  newAluno() {
    this.router.navigate(['/aluno/insert']);
  }
}