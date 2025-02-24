import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl + '/api/Login';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email, password });
  }

  fakeLogin(username: string, password: string): Observable<any> {
    return new Observable((observer) => {
      if (username == 'datacx@datacx.com' && password == '123456') {        
        observer.next(
          { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c" }
        );
      } else {        
          observer.error();
      }
    });
  }

  logout() {
    if (typeof window !== 'undefined' && sessionStorage) {
      sessionStorage.removeItem('authToken');
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && sessionStorage) {
      return sessionStorage.getItem('authToken');
    }
    else {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
