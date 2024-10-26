import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL = 'http://localhost:3500/api';

  private accessToken: string | null = null;

  constructor(private http: HttpClient) {}

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(token: string) {
    this.accessToken = token;
  }

  setUserInfo(userId: string, email: string, roles: string[], permissions: string[]): void {
    localStorage.setItem('userId', userId);
    localStorage.setItem('email', email);
    localStorage.setItem('roles', JSON.stringify(roles));
    localStorage.setItem('permissions', JSON.stringify(permissions));
  }

  login(email: string, password: string): Observable<{ message: string, accessToken: string, userId: string, email: string, roles: string[] , permissions: string[]}> {
    return this.http.post<{ message: string, accessToken: string, userId: string, email: string, roles: string[], permissions: string[] }>(`${this.apiURL}/login`, { email, password }).pipe(
      tap(response => {
        this.setAccessToken(response.accessToken);
        this.setUserInfo(response.userId, response.email, response.roles, response.permissions);
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('roles');
    localStorage.removeItem('permissions');
    this.http.get(`${this.apiURL}/logout`).subscribe();
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
