import { Component, OnInit } from '@angular/core';
import { IssuesService } from '../../services/issues.service';
import { AuthService } from '../../services/auth.service';
import { Issue } from '../../models/issues';

@Component({
  selector: 'app-issues-page',
  templateUrl: './issues-page.component.html',
  styleUrls: ['./issues-page.component.css']
})
export class IssuesPageComponent implements OnInit {
  rowData: any[] = []; 
  canWrite: boolean = false;
  canDelete: boolean = false;
  itemsPerPage = 10; 
  currentPage = 1;
  totalPages = 1;
  paginatedData: any[] = [];
  emptyRows: number[] = [];
  selectedIssue?: Issue; 
  isFormVisible = false;
  showIssues: boolean = true; 

  constructor(private issuesService: IssuesService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadIssues();
    this.checkPermissions();
  }

  loadIssues(): void {
    this.issuesService.getAllIssues().subscribe({
      next: (response) => {
        this.rowData = response;
        this.totalPages = Math.ceil(this.rowData.length / this.itemsPerPage); 
        this.updatePaginatedData(); 
      },
      error: (error) => {
        console.error('Error fetching issues:', error);
      }
    });
  }

  checkPermissions(): void {
    const userRoles = this.authService.getUserPermissions();
    this.canWrite = userRoles.includes('WRITE');
    this.canDelete = userRoles.includes('DELETE');
  }

  deleteIssue(id: string): void {
    if (this.canDelete) {
      if (confirm('Are you sure you want to delete this issue?')) {
        this.issuesService.deleteIssue(id).subscribe({
          next: () => {
            this.loadIssues(); 
          },
          error: (error) => {
            console.error('Error deleting issue:', error);
          }
        });
      }
    }
  }

  editIssue(issue: Issue): void {
    this.selectedIssue = issue;
    this.isFormVisible = true; 
    this.showIssues = false; 
  }

  createIssue(): void {
    this.selectedIssue = undefined;
    this.isFormVisible = true;
    this.showIssues = false;
  }

  onFormClose(): void {
    this.isFormVisible = false; 
    this.selectedIssue = undefined; 
    this.loadIssues(); 
    this.showIssues = true; 
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedData();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedData();
    }
  }

  updatePaginatedData(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedData = this.rowData.slice(start, end);
    this.emptyRows = Array.from({ length: this.itemsPerPage - this.paginatedData.length });
  }
}
