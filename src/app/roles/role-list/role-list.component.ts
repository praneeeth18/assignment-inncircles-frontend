import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrl: './role-list.component.css'
})
export class RoleListComponent implements OnInit {
  roles: Role[] = [];
  selectedRole: Role | null = null;
  @Output() edit = new EventEmitter<Role>();
  @Output() delete = new EventEmitter<string>();

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles() {
    this.roleService.getAllRoles().subscribe((data: Role[]) => {
      this.roles = data;
    });
  }

  editRole(role: Role) {
    this.selectedRole = role;
    this.edit.emit(role);
  }

  deleteRole(roleId: string) {
    if (confirm('Are you sure you want to delete this role?')) {
      this.roleService.deleteRole(roleId).subscribe(() => {
        this.loadRoles(); 
        this.delete.emit(roleId);
      });
    }
  }

  closeForm() {
    this.selectedRole = null;
    this.loadRoles();
  }
}
