import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

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
        // Check if error is a 401 and if it's not a login request
        if (error instanceof HttpErrorResponse && error.status === 401 && !req.url.includes('/login')) {
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
              return throwError(() => refreshError);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
