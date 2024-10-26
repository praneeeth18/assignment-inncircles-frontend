import { Component, ViewChild } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { RolesListComponent } from '../roles-list/roles-list.component';

@Component({
  selector: 'app-roles-page',
  templateUrl: './roles-page.component.html',
  styleUrl: './roles-page.component.css'
})
export class RolesPageComponent {
  @ViewChild(RolesListComponent) rolesListComponent!: RolesListComponent;
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
