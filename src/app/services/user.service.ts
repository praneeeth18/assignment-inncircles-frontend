import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiURL = 'http://localhost:3500/api/users';

  constructor(private http: HttpClient) { }

  register(userDetails: User): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiURL}/register`, userDetails);
  }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this.apiURL}`);
  }

  updateProfile(userDeatils: User, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURL}/users/updateProfile/${id}`, userDeatils);
  }

  updateRole(userDeatils: User, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURL}/users/updateRole/${id}`, userDeatils);
  }

  deletUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiURL}/users/delete/${id}`);
  }
}
