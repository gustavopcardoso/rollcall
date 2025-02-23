import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PresencaService } from '../../../services/presenca.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirmar-presenca',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ],
  templateUrl: './confirmar-presenca.component.html',
  styleUrls: ['./confirmar-presenca.component.css']
})
export class ConfirmarPresencaComponent implements OnInit {
  presencaForm: FormGroup;
  linkAula: string | null = null;
  mensagem: string = '';
  codigoAula: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private presencaService: PresencaService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
    this.presencaForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.codigoAula = this.route.snapshot.paramMap.get('codigoAula');
  }

  confirmarPresenca() {
    if (this.presencaForm.invalid || !this.codigoAula) {
      return;
    }

    const email = this.presencaForm.value.email;

    this.presencaService.confirmarPresenca(email, this.codigoAula).subscribe({
      next: (res) => {
        window.location.href = res.link;
      },
      error: (err) => {
        this.snackBar.open('Erro ao confirmar presença.', 'Fechar', { duration: 3000 });
      }
    });
  }
}
