import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { InsertAlunoComponent } from './components/aluno/insert-aluno/insert-aluno.component';
import { ListAlunoComponent } from './components/aluno/list-aluno/list-aluno.component';
import { InsertAulaComponent } from './components/aula/insert-aula/insert-aula.component';

export const routes: Routes = [
    { path: '', component: LoginComponent},
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'aluno/insert', component: InsertAlunoComponent, canActivate: [AuthGuard] },
    { path: 'aluno/list', component: ListAlunoComponent, canActivate: [AuthGuard] },
    { path: 'aula/insert', component: InsertAulaComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
