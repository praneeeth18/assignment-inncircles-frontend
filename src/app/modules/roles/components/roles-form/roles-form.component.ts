import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from '../../../../services/role.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Permission } from '../../../../models/role';

@Component({
  selector: 'app-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrl: './roles-form.component.css'
})
export class RolesFormComponent implements OnInit{
  @Input() role: any;
  @Output() close = new EventEmitter<void>();
  @Output() roleCreatedOrUpdated = new EventEmitter<void>();
  
  roleForm: FormGroup;
  availablePermissions: Permission[] = ['READ', 'WRITE', 'ADMIN'];

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
      const index = this.permissionsArray.controls
        .findIndex(control => control.value === permissionValue);
      if (index >= 0) {
        this.permissionsArray.removeAt(index);
      }
    }
  }

  onSubmit() {
    if (this.roleForm.valid) {
      const roleData = this.roleForm.value;
      if (this.role) {
        this.roleService.updateRole(this.role._id, roleData).subscribe(() => {
          this.roleCreatedOrUpdated.emit();
          this.close.emit();
        });
      } else {
        this.roleService.createRole(roleData.name, roleData.permissions).subscribe(() => {
          this.roleCreatedOrUpdated.emit();
          this.close.emit();
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
