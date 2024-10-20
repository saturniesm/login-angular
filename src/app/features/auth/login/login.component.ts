import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TextComponent } from '@app/shared/components/input/text/text.component';
import { PasswordComponent } from '@app/shared/components/input/password/password.component';
import { CaptchaComponent } from '@app/shared/components/captcha/captcha.component';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TextComponent,
    PasswordComponent,
    CaptchaComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  submitted = false;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  @ViewChild(CaptchaComponent) captchaComponent!: CaptchaComponent; // Reference to the CaptchaComponent

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  // TODO: make this as a service so there's  no big chunck of code like this
  getEmailErrorMessage(): string {
    const emailControl = this.email;
    if (
      emailControl &&
      (emailControl?.touched || emailControl?.dirty || this.submitted == true)
    ) {
      if (emailControl.hasError('required')) {
        return 'Email is required.';
      }

      if (emailControl.hasError('email')) {
        return 'Please enter a valid email address.';
      }
    }
    return '';
  }

  getPassErrorMessage(): string {
    const passControl = this.password;
    if (
      passControl &&
      (passControl?.touched || passControl?.dirty || this.submitted == true)
    ) {
      if (passControl.hasError('required')) {
        return 'Password is required.';
      }
    }
    return '';
  }

  handleCaptchaVerification(isVerified: boolean) {
    if (isVerified) {
      console.log('CAPTCHA is verified!');
      // Proceed with your form submission or other logic
    } else {
      console.log('CAPTCHA verification failed.');
      // Show an error message or take appropriate action
    }
  }

  handleVerfitication() {
    this.captchaComponent.verifyCaptcha();
    this.getEmailErrorMessage();
    this.getPassErrorMessage();
  }

  onSubmit() {
    this.submitted = true;
    this.handleVerfitication();
  }
}
