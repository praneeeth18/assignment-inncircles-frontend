import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {
  rowData: any[] = [];
  canWrite: boolean = false; 
  canDelete: boolean = false;
  itemsPerPage = 10;  
  currentPage = 1;  
  totalPages = 0; 
  paginatedData: any[] = []; 
  emptyRows: number[] = [];
  selectedUser?: User;  
  isFormVisible = false;
  showUsers: boolean = true; 

  constructor(private userService: UserService,  private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
    this.checkPermissions();
  }

  loadUsers(): void {
    this.userService.getAllUsers().subscribe({
      next: (response) => {
        this.rowData = response;
        this.totalPages = Math.ceil(this.rowData.length / this.itemsPerPage); 
        this.updatePaginatedData(); 
      },
      error: (error) => {
        console.error('Error fetching users:', error);
      }
    });
  }

  checkPermissions(): void {
    const userRoles = this.authService.getUserPermissions();
    this.canWrite = userRoles.includes('WRITE');
    this.canDelete = userRoles.includes('DELETE');
  }
  
  deleteuser(id: string): void {
    if (this.canDelete) {
      if (confirm('Are you sure you want to delete this issue?')) {
        this.userService.deletUser(id).subscribe({
          next: () => {
            this.loadUsers(); 
          },
          error: (error) => {
            console.error('Error deleting issue:', error);
          }
        });
      }
    }
  }
  
  edituser(user: User): void {
    this.selectedUser = user; 
    this.isFormVisible = true;
    this.showUsers = false;
  }

  createUser(): void {
    this.selectedUser = undefined;
    this.isFormVisible = true; 
    this.showUsers = false; 
  }

  onFormClose(): void {
    this.isFormVisible = false;
    this.selectedUser = undefined; 
    this.loadUsers(); 
    this.showUsers = true; 
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

  getRoleNames(roles: any[]): string {
    if (Array.isArray(roles)) {
        return roles.map(role => role.name).join(', ');
    }
    return '';
  }

}