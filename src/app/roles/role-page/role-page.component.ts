import { Component, ViewChild } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { RoleListComponent } from '../role-list/role-list.component';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrl: './role-page.component.css'
})
export class RolePageComponent {
  @ViewChild(RoleListComponent) rolesListComponent!: RoleListComponent;
  selectedRole: any = null;
  showForm = false;

  constructor(private roleService: RoleService) {}

  createRole() {
    this.selectedRole = null;
    this.showForm = true;
  }

  editRole(role: any) {
    this.selectedRole = role;
    this.showForm = true;
  }

  deleteRole(roleId: string) {
    console.log(`Role with ID ${roleId} deleted.`);
  }

  onRoleCreatedOrUpdated() {
    this.rolesListComponent.loadRoles(); 
  }

  onFormClose() {
    this.showForm = false;
    this.selectedRole = null;
  }
}


