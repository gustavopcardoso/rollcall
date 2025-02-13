import { Component, OnInit, ViewChild } from '@angular/core';
import { MenuComponent } from "../../menu/menu.component";
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatTableDataSource, MatTableModule} from '@angular/material/table'; 
import { MatIcon } from '@angular/material/icon';
import { MatPaginator } from '@angular/material/paginator';
import { Aluno } from '../../../interfaces/aluno';
import { MatSort } from '@angular/material/sort';
import { AlunoService } from '../../../services/aluno.service';

@Component({
  selector: 'app-list-aluno',
  imports: [
    MenuComponent,
    MatCard,
    MatCardTitle,
    MatTableModule,
    MatIcon,
    MatPaginator,
  ],
  templateUrl: './list-aluno.component.html',
  styleUrl: './list-aluno.component.css'
})
export class ListAlunoComponent implements OnInit {
  displayedColumns: string[] = ['nome', 'ativo', 'editar', 'toggleAtivo'];
  dataSource = new MatTableDataSource<Aluno>();

  constructor(private alunoService: AlunoService) {}

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

  editAluno(aluno: Aluno) {
    console.log('Editar aluno:', aluno);
  }

  toggleAtivo(aluno: Aluno) {
    aluno.ativo = !aluno.ativo;
    console.log('Aluno atualizado:', aluno);
  }
}
