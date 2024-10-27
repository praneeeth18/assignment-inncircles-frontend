import { Component, EventEmitter, Input, OnInit, Output, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit, OnChanges {
  @Input() user?: any; 
  @Output() close = new EventEmitter<void>();

  userForm: FormGroup;
  isEditMode: boolean = false;
  roles: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserService, private roleService: RoleService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      age: ['', [Validators.min(1), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]], 
      contact: ['', [Validators.maxLength(15)]],
      bio: ['', [Validators.maxLength(250)]],
      roles: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
  }

  ngOnChanges(): void {
    if (this.user) {
      this.setEditMode(true);
      this.userForm.patchValue(this.user);

      this.userForm.get('password')?.clearValidators();
      this.userForm.get('password')?.updateValueAndValidity();
    } else {
      this.setEditMode(false);
      this.userForm.reset();
      this.userForm.get('password')?.setValidators([
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]);
      this.userForm.get('password')?.updateValueAndValidity();
    }
  }

  private setEditMode(editMode: boolean): void {
    this.isEditMode = editMode;
  }

  fetchRoles(): void {
    this.roleService.getAllRoles().subscribe({
      next: (response) => {
        this.roles = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const userDetails = this.userForm.value;
      const request$ = this.isEditMode 
        ? this.userService.updateUser(userDetails, this.user!._id)
        : this.userService.register(userDetails);

      request$.subscribe({
        next: () => {
          alert(`User ${this.isEditMode ? 'updated' : 'created'} successfully!`);
          this.resetForm();
        },
        error: (error) => {
          console.error(`Error ${this.isEditMode ? 'updating' : 'creating'} user:`, error);
          alert(`Error ${this.isEditMode ? 'updating' : 'creating'} user`);
        }
      });
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.setEditMode(false);
    this.close.emit();
  }
}
