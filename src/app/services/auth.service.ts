import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'http://localhost:3500/api';

  private accessToken: string | null = localStorage.getItem('accessToken');
  private loginStatusSubject = new BehaviorSubject<boolean>(!!this.accessToken);
  loginStatus$ = this.loginStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
    localStorage.setItem('accessToken', token);
    this.loginStatusSubject.next(true); 
  }

  setUserInfo(userId: string, email: string, roles: string[], permissions: string[]): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', JSON.stringify(roles));  
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  login(email: string, password: string): Observable<{ message: string; accessToken: string; userId: string; email: string; roles: string[]; permissions: string[] }> {
    return this.http.post<{ message: string; accessToken: string; userId: string; email: string; roles: string[]; permissions: string[] }>(`${this.apiURL}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(response => {
        this.setAccessToken(response.accessToken);
        this.setUserInfo(response.userId, response.email, response.roles, response.permissions);
        this.loginStatusSubject.next(true); 
      })
    );
  }

  refreshAccessToken(): Observable<string> {
    return this.http.get<{ accessToken: string }>(`${this.apiURL}/refresh`).pipe(
      map(response => response.accessToken),
      tap(newToken => {
        this.setAccessToken(newToken);
      })
    );
  }

  logout(): void {
    this.accessToken = null;
    localStorage.clear();  
    this.loginStatusSubject.next(false); 
    this.http.get(`${this.apiURL}/logout`).subscribe({
      error: err => console.error('Logout failed:', err) 
    });
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getUserRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  getUserPermissions(): string[] {
    const permissions = localStorage.getItem('permissions');
    return permissions ? JSON.parse(permissions) : [];
  }
}
