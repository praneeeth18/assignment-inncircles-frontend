import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private refreshAttempts = 0;
  private readonly MAX_REFRESH_ATTEMPTS = 1;

  constructor(private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();
    let authReq = req;

    if (accessToken) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });
    }

    return next.handle(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/login')) {
          if (this.refreshAttempts < this.MAX_REFRESH_ATTEMPTS) {
            this.refreshAttempts++;
            return this.authService.refreshAccessToken().pipe(
              switchMap((newAccessToken) => {
                this.authService.setAccessToken(newAccessToken);
                const retryReq = req.clone({
                  headers: req.headers.set('Authorization', `Bearer ${newAccessToken}`)
                });
                return next.handle(retryReq);
              }),
              catchError((refreshError) => {
                this.authService.logout();
                this.router.navigate(['']);
                alert('Session expired. Please log in again.');
                this.refreshAttempts = 0; 
                return throwError(() => refreshError);
              })
            );
          } else {
            this.authService.logout();
            this.router.navigate(['']);
            alert('Too many refresh attempts. Please log in again.');
            this.refreshAttempts = 0; 
            return throwError(() => error);
          }
        }
        return throwError(() => error);
      })
    );
  }
}
