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

  login(email: string, password: string): Observable<{ message: string, accessToken: string }> {
    return this.http.post<{ message: string, accessToken: string }>(`${this.apiURL}/login`, { email, password }).pipe(
      tap(response => {
        this.setAccessToken(response.accessToken);
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

  logout() {
    this.accessToken = null;
    this.http.get(`${this.apiURL}/logout`).subscribe();
  }
}
