import { Component } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PresencaService } from '../../../services/presenca.service';
import { MatDividerModule } from '@angular/material/divider';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { combineDateAndTime, getDateWithoutTimeZone } from '../../../helpers/date.helper';
import { MatIconModule } from '@angular/material/icon';
import * as ExcelJS from 'exceljs';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-list-presenca',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MenuComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTimepickerModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './list-presenca.component.html',
  styleUrl: './list-presenca.component.css'
})
export class ListPresencaComponent {
  aulas: any[] = [];
  loading = false;
  presencaFilterForm: FormGroup;
  displayedColumns: string[];

  constructor(
    private presencaService: PresencaService,
    private fb: FormBuilder
  ) {
    this.presencaFilterForm = this.initializeForm();
    this.displayedColumns = this.initializeColumns();
  }

  onSubmit() {
    const formValue = this.presencaFilterForm.value;
    const dataInicio = combineDateAndTime(formValue.dataInicio, formValue.horaInicio, true);
    const dataFim = combineDateAndTime(formValue.dataFim, formValue.horaFim);

    const filterValues = {
      titulo: formValue.tituloAula,
      produto: formValue.produto,
      tutor: formValue.tutor,
      dataHoraInicio: dataInicio ? getDateWithoutTimeZone(dataInicio) : null,
      dataHoraFim: dataFim ? getDateWithoutTimeZone(dataFim) : null
    };

    this.loadAulas(filterValues);
  }

  loadAulas(filterValues: any) {
    this.loading = true;
    this.presencaService.listPresenca(filterValues).subscribe({
      next: (aulas) => {
        const aulasDataSource = aulas.map((aula: any) => ({
          id: aula.id,
          produto: aula.produto,
          titulo: aula.titulo,
          dataHora: aula.dataHora,
          tutor: aula.tutor,
          alunos: new MatTableDataSource(
            aula.presencas.map((p: any) => ({
              email: p.emailAluno,
              confirmadoEm: p.confirmadoEm,
              nomeAluno: p.nomeAluno ?? "Desconhecido",
              empresa: p.aluno?.empresa ?? "Desconhecido"
            }))
          )
        }));

        this.aulas = aulasDataSource;
        this.loading = false;
      },
      error: () => {
        console.error("Erro ao carregar aulas.");
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onClear() {
    this.presencaFilterForm.reset();
  }

  initializeForm(): FormGroup {
    return this.presencaFilterForm = this.fb.group({
      dataInicio: [''],
      horaInicio: [''],
      dataFim: [''],
      horaFim: [''],
      tutor: [''],
      produto: [''],
      tituloAula: ['']
    });
  }

  initializeColumns(): string[] {
    return [
      'email',
      'confirmadoEm',
      'nome',
      'empresa'
    ];
  }

  async exportAsXLSX() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Presenças');

    worksheet.columns = [
      { header: 'Data Aula', key: 'dataHora', width: 25 },
      { header: 'Título Aula', key: 'aula', width: 25 },      
      { header: 'Tutor', key: 'tutor', width: 25 },
      { header: 'Produto', key: 'produto', width: 25 },      
      { header: 'Email', key: 'email', width: 25 },
      { header: 'Nome', key: 'nome', width: 25 },
      { header: 'Empresa', key: 'empresa', width: 25 },
      { header: 'Aula acessada em', key: 'confirmadoEm', width: 25 }
    ];

    var options = { day: '2-digit' as '2-digit', month: '2-digit' as '2-digit', year: 'numeric' as 'numeric', hour: '2-digit' as '2-digit', minute: '2-digit' as '2-digit', second: '2-digit' as '2-digit', hour12: false };

    this.aulas.forEach((aula: any) => {
      if (!aula.alunos.data.length) {
        worksheet.addRow({
          dataHora: new Date(aula.dataHora).toLocaleString('pt-BR', options).replace(',', ''),
          aula: aula.titulo,
          tutor: aula.tutor,
          produto: aula.produto
        });
      }
      else
      {
      aula.alunos.data.forEach((aluno: any) => {
        worksheet.addRow({
          dataHora: new Date(aula.dataHora).toLocaleString('pt-BR', options).replace(',', ''),
          aula: aula.titulo,
          tutor: aula.tutor,
          produto: aula.produto,
          email: aluno.email,
          nome: aluno.nomeAluno,
          empresa: aluno.empresa,
          confirmadoEm: new Date(aluno.confirmadoEm).toLocaleString('pt-BR', options).replace(',', '')
        });
      });
    }
    });

    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    FileSaver.saveAs(blob, 'presencas.xlsx');    
  }
}
