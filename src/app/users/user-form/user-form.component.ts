import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
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
      password: ['', this.isEditMode ? [] : [Validators.required]], 
      contact: ['', [Validators.maxLength(15)]],
      bio: ['', [Validators.maxLength(250)]],
      roles: [[], [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.fetchRoles();
    if (this.user) {
      this.isEditMode = true;
      this.userForm.patchValue(this.user);
    }
  }

  ngOnChanges(): void {
    if (this.user) {
      this.isEditMode = true;
      this.userForm.patchValue(this.user);
    } else {
      this.isEditMode = false;
      this.userForm.reset();
    }
  }

  fetchRoles() {
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
      if (this.isEditMode) {
        this.userService.updateProfile(userDetails, this.user!._id).subscribe({
          next: () => {
            alert('User updated successfully!');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error updating user:', error);
          }
        });
      } else {
        this.userService.register(userDetails).subscribe({
          next: () => {
            alert('User created successfully!');
            this.resetForm();
          },
          error: (error) => {
            console.error('Error creating user:', error);
          }
        });
      }
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.isEditMode = false;
    this.close.emit(); 
  }
}

