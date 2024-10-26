import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Fixed typo here
})
export class LoginComponent implements OnInit {
  loginFormControl!: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loginFormControl = this.fb.group({
      email: ['', [Validators.required, Validators.email, this.emailValidator]],
      password: ['', [Validators.required, Validators.minLength(8), this.passwordValidator]],
    });
  }

  emailValidator(control: any) {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return emailRegex.test(control.value) ? null : { invalidEmail: true };
  }

  passwordValidator(control: any) {
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordCriteria.test(control.value) ? null : { invalidPassword: true };
  }

  onSubmit() {
    if (this.loginFormControl.valid) {
      const { email, password } = this.loginFormControl.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          this.router.navigate(['/issues']);
        },
        error: (error) => {
          if (error.status === 400) {
            this.errorMessage = 'Incorrect email or password. Please try again.';
            alert(this.errorMessage);
          } else {
            this.errorMessage = 'Login failed. Please try again.';
            alert(this.errorMessage);
          }
        }
      });
    } else {
      this.errorMessage = 'Please fill out the form correctly.';
      alert(this.errorMessage);
    }
  }
}
