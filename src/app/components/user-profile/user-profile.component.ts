import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  userId: any;
  isEditMode: boolean = false;
  initialValues: any; 

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: [{ value: '', disabled: true }, [Validators.required, Validators.maxLength(50)]],
      age: [{ value: null, disabled: true }, [Validators.min(1), Validators.max(100)]],
      email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
      contact: [{ value: '', disabled: true }, Validators.maxLength(15)],
      bio: [{ value: '', disabled: true }, Validators.maxLength(250)]
    });
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId')?.toString();
    if (this.userId) {
      this.loadUserProfile(this.userId);
    }
  }

  loadUserProfile(id: string) {
    this.userService.getUserById(id).subscribe(user => {
      this.userForm.patchValue({
        name: user.name,
        age: user.age,
        email: user.email,
        contact: user.contact,
        bio: user.bio,
      });
      this.initialValues = this.userForm.getRawValue(); 
    });
  }

  toggleEditMode() {
    if (this.isEditMode) {
      this.userForm.reset(this.initialValues); 
      this.userForm.disable(); 
    } else {
      this.userForm.enable();
    }
    this.isEditMode = !this.isEditMode;
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userDetails = {
        id: this.userId,
        name: this.userForm.value.name,
        age: this.userForm.value.age,
        email: this.userForm.value.email,
        contact: this.userForm.value.contact,
        bio: this.userForm.value.bio
      };
      this.userService.updateProfile(userDetails, this.userId).subscribe({
        next: (response) => {
          alert('Profile updated successfully');
          this.initialValues = this.userForm.getRawValue(); 
          this.toggleEditMode();
        },
        error: (error) => {
          alert('Error updating profile');
          console.error(error);
        }
      });
    }
  }
}
