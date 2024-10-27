import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Role } from '../../models/role';
import { User } from '../../models/user';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userForm: FormGroup;
  userId: any;
  showPasswordField: boolean = false;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      age: [null, [Validators.min(1), Validators.max(100)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', Validators.maxLength(15)],
      bio: ['', Validators.maxLength(250)]
    });
    this.passwordForm = this.fb.group({
      password: ['', Validators.required],
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
      console.log(user);
      this.userForm.patchValue({
        name: user.name,
        age: user.age,
        email: user.email,
        contact: user.contact,
        bio: user.bio,
      });
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const userDetails = {
        id: this.userId, 
        name: this.userForm.value.name,
        age: this.userForm.value.age,
        email: this.userForm.value.email,
        password: this.userForm.value.password, 
        contact: this.userForm.value.contact,
        bio: this.userForm.value.bio
      };

      this.userService.updateProfile(userDetails, this.userId).subscribe({
        next: (response) => {
          alert('Profile updated successfully');
        },
        error: (error) => {
          alert('Error updating profile');
          console.error(error);
        }
      });
    }
  }

  togglePasswordField() {
    this.showPasswordField = !this.showPasswordField; 
    if (!this.showPasswordField) {
        this.userForm.patchValue({ password: '' }); 
    }
}

  onPasswordSubmit() {
    if (this.passwordForm.valid) {
      const passwordDetails = this.passwordForm.value.password;
      this.userService.updatePassword(passwordDetails, this.userId).subscribe({
        next: (response) => {
          this.passwordForm.reset(); 
          this.showPasswordField = false; 
          alert('Password updated successfully');
        },
        error: (error) => {
          alert('Error updating password');
          console.error(error);
        }
      });
    }
  }
}
