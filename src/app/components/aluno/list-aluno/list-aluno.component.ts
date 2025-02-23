import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { Aluno } from '../../../interfaces/aluno';
import { MatSort } from '@angular/material/sort';
import { AlunoService } from '../../../services/aluno.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { EditAlunoComponent } from '../edit-aluno/edit-aluno.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-aluno',
  standalone: true,
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatTableModule,
    MatIcon,
    MatPaginator,
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    MatInputModule
  ],
  templateUrl: './list-aluno.component.html',
  styleUrl: './list-aluno.component.css'
})
export class ListAlunoComponent implements OnInit {
  displayedColumns: string[] = [
    'nome', 
    'email',
    'empresa',
    'finalContrato',
    'produto',
    'ativo', 
    'editar'
  ];
  dataSource = new MatTableDataSource<Aluno>();

  constructor(
    private alunoService: AlunoService, 
    private router: Router) 
  {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.getAlunos();
  }
 
  getAlunos() {
    this.alunoService.getAlunos().subscribe(alunos => {
      this.dataSource.data = alunos;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  saveAluno(aluno: Aluno) {
    this.alunoService.saveAluno(aluno).subscribe(() => {
      this.getAlunos();
    });
  }

  editAluno(aluno: Aluno) {
    this.router.navigate(['/aluno/edit/', aluno.id]);
  }
}
