import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../../models/role';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  @Input() role: any;
  @Output() close = new EventEmitter<void>();
  @Output() roleCreatedOrUpdated = new EventEmitter<void>();

  roleForm: FormGroup;
  availablePermissions: Permission[] = ['READ', 'WRITE', 'DELETE'];

  constructor(private fb: FormBuilder, private roleService: RoleService) {
    this.roleForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      permissions: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    if (this.role) {
      this.roleForm.patchValue(this.role);
      this.setPermissions(this.role.permissions || []);
    }
  }

  get permissionsArray(): FormArray {
    return this.roleForm.get('permissions') as FormArray;
  }

  setPermissions(permissions: string[]) {
    permissions.forEach(permission => {
      this.permissionsArray.push(this.fb.control(permission));
    });
  }

  onPermissionChange(event: any) {
    const permissionValue = event.target.value;
    if (event.target.checked) {
      this.permissionsArray.push(this.fb.control(permissionValue));
    } else {
      const index = this.permissionsArray.controls.findIndex(control => control.value === permissionValue);
      if (index >= 0) {
        this.permissionsArray.removeAt(index);
      }
    }
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const roleData = this.roleForm.value;
      if (this.role) {
        this.roleService.updateRole(this.role._id, roleData.name, roleData.permissions).subscribe({
          next: () => {
            alert('Role updated successfully');
            this.roleCreatedOrUpdated.emit();
            this.close.emit();
          },
          error: (error) => {
            alert('Error updating role: ' + error.message);
            console.error(error);
          }
        });
      } else {
        this.roleService.createRole(roleData.name, roleData.permissions).subscribe({
          next: () => {
            alert('Role created successfully');
            this.roleCreatedOrUpdated.emit();
            this.close.emit();
          },
          error: (error) => {
            alert('Error creating role: ' + error.message);
            console.error(error);
          }
        });
      }
    } else {
      this.roleForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.close.emit();
  }
}
