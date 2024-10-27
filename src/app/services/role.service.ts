import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, Permission } from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'http://localhost:3500/api/roles';

  constructor(private http: HttpClient) {}

  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}`);
  }

  createRole(name: string, permissions: Permission[]): Observable<any> {
    const body = { name, permissions };
    return this.http.post(`${this.apiUrl}`, body);
  }

  updateRole(id: string, name: string, permissions: Permission[]): Observable<any> {
    const body = { name, permissions };
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  deleteRole(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
