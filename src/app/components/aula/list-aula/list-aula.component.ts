import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
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
    MenuComponent
],
  templateUrl: './list-aula.component.html',
  styleUrl: './list-aula.component.css'
})
export class ListAulaComponent implements OnInit {
  displayedColumns: string[] = [
    'titulo',
    'tutor', 
    'dataHora', 
    'observacao',
    'acao', 
    'editar'
  ];
  dataSource = new MatTableDataSource<Aula>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private aulaService: AulaService, 
    private clipboard: Clipboard, 
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAulas();
  }

  getAulas() {
    this.aulaService.getAulas().subscribe(aulas => {
      this.dataSource.data = aulas;
    });
  }

  copyLink(link: string) {
    this.clipboard.copy(link);
    this.snackBar.open('Link copiado!', 'Fechar', { duration: 3000 });
  }

  editAula(aula: Aula) {
    this.router.navigate(['/aula/edit/', aula.id]);
  }
}
