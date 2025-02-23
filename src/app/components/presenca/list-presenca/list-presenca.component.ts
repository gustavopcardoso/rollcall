import { Component, HostListener, OnInit } from '@angular/core';
import { MenuComponent } from '../../menu/menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { PresencaService } from '../../../services/presenca.service';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-list-presenca',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MenuComponent
  ],
  templateUrl: './list-presenca.component.html',
  styleUrl: './list-presenca.component.css'
})
export class ListPresencaComponent implements OnInit {
  aulas: any[] = [];
  loading = false;
  page = 2;

  constructor(    
    private presencaService: PresencaService
  ) {}

  ngOnInit(): void {
    this.loadAulas();
  }  

  @HostListener("window:scroll", [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 && !this.loading) {
      this.loadAulas();
    }
  }

  loadAulas() {
    this.loading = true;
    this.presencaService.listPresenca(this.page).subscribe({
      next: (novasAulas) => {
        const aulasProcessadas = novasAulas.map((aula: any) => ({
          id: aula.id,
          titulo: aula.titulo,
          dataHora: aula.dataHora,
          tutor: aula.tutor,
          alunosRegistrados: new MatTableDataSource(
            aula.presencas.filter((p: any) => p.aluno !== null).map((p: any) => ({
              nomeAluno: p.nomeAluno || "Desconhecido",
              email: p.emailAluno,
              empresa: p.aluno?.empresa || "Não Informado",
              confirmadoEm: p.confirmadoEm
            }))
          ),
          alunosNaoRegistrados: new MatTableDataSource(
            aula.presencas.filter((p: any) => p.aluno === null).map((p: any) => ({
              email: p.emailAluno,
              confirmadoEm: p.confirmadoEm
            }))
          )
        }));

        this.aulas = [...this.aulas, ...aulasProcessadas];
        this.page++;
        this.loading = false;
      },
      error: () => {
        console.error("Erro ao carregar aulas.");
        this.loading = false;
      }
    });    
  }
}
