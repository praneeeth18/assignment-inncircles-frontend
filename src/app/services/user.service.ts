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
    return this.http.post<{ message: string }>(`${this.apiURL}`, userDetails);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiURL}`);
  }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiURL}/${id}`);
  }

  updateProfile(userDeatils: User, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURL}/updateProfile/${id}`, userDeatils);
  }

  updateRole(userDeatils: User, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURL}/updateRole/${id}`, userDeatils);
  }

  deletUser(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiURL}/${id}`);
  }

  updatePassword(password: string, id: string): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(`${this.apiURL}/updatePassword/${id}`, password);
  }
}
