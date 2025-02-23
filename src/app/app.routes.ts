import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { InsertAlunoComponent } from './components/aluno/insert-aluno/insert-aluno.component';
import { ListAlunoComponent } from './components/aluno/list-aluno/list-aluno.component';
import { InsertAulaComponent } from './components/aula/insert-aula/insert-aula.component';
import { ConfirmarPresencaComponent } from './components/presenca/confirmar-presenca/confirmar-presenca.component';
import { GuidValidatorGuard } from './guards/valid-guid.guard';
import { ListAulaComponent } from './components/aula/list-aula/list-aula.component';
import { EditAlunoComponent } from './components/aluno/edit-aluno/edit-aluno.component';
import { EditAulaComponent } from './components/aula/edit-aula/edit-aula.component';
import { ListPresencaComponent } from './components/presenca/list-presenca/list-presenca.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'aluno/insert', component: InsertAlunoComponent, canActivate: [AuthGuard] },
    { path: 'aluno/list', component: ListAlunoComponent, canActivate: [AuthGuard] },
    { path: 'aluno/edit/:id', component: EditAlunoComponent, canActivate: [AuthGuard] },
    { path: 'aula/insert', component: InsertAulaComponent, canActivate: [AuthGuard] },
    { path: 'aula/list', component: ListAulaComponent, canActivate: [AuthGuard] },
    { path: 'aula/edit/:id', component: EditAulaComponent, canActivate: [AuthGuard] },
    { path: 'aula/:codigoAula', component: ConfirmarPresencaComponent, canActivate: [GuidValidatorGuard] },
    { path: 'presenca/list', component: ListPresencaComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
