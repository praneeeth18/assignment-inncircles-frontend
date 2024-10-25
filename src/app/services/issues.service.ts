import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Issue } from '../models/issues';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssuesService {

  private apiUrl = 'http://localhost:3500/api/issues';

  constructor(private http: HttpClient) {}

  createIssue(issue: Issue): Observable<any> {
    return this.http.post(`${this.apiUrl}/`, issue);
  }

  getAllIssues(): Observable<Issue[]> {
    return this.http.get<Issue[]>(`${this.apiUrl}/getAllIssues`);
  }

  updateIssue(id: string, issue: Issue): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateIssue/${id}`, issue);
  }

  deleteIssue(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteIssue/${id}`);
  }
}
