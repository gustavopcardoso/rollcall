import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuidValidatorGuard } from './guards/valid-guid.guard';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) },
    { path: 'dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [AuthGuard] },
    { path: 'aluno/insert', loadComponent: () => import('./components/aluno/insert-aluno/insert-aluno.component').then(m => m.InsertAlunoComponent), canActivate: [AuthGuard] },
    { path: 'aluno/list', loadComponent: () => import('./components/aluno/list-aluno/list-aluno.component').then(m => m.ListAlunoComponent), canActivate: [AuthGuard] },
    { path: 'aluno/edit/:id', loadComponent: () => import('./components/aluno/edit-aluno/edit-aluno.component').then(m => m.EditAlunoComponent), canActivate: [AuthGuard] },
    { path: 'aula/insert', loadComponent: () => import('./components/aula/insert-aula/insert-aula.component').then(m => m.InsertAulaComponent), canActivate: [AuthGuard] },
    { path: 'aula/list', loadComponent: () => import('./components/aula/list-aula/list-aula.component').then(m => m.ListAulaComponent), canActivate: [AuthGuard] },
    { path: 'aula/edit/:id', loadComponent: () => import('./components/aula/edit-aula/edit-aula.component').then(m => m.EditAulaComponent), canActivate: [AuthGuard] },
    { path: 'aula/:codigoAula', loadComponent: () => import('./components/presenca/confirmar-presenca/confirmar-presenca.component').then(m => m.ConfirmarPresencaComponent), canActivate: [GuidValidatorGuard] },
    { path: 'presenca/list', loadComponent: () => import('./components/presenca/list-presenca/list-presenca.component').then(m => m.ListPresencaComponent), canActivate: [AuthGuard] },
    { path: '**', redirectTo: '' }
];
