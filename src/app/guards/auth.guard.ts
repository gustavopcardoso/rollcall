import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  canActivate(): boolean {    
    if (typeof window !== 'undefined' && sessionStorage) {
      this.isAuthenticated = !!sessionStorage.getItem('authToken');  // atenção aqui
    }
    if (!this.isAuthenticated) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
