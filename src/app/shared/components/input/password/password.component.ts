import { Component, Input, forwardRef } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  NG_VALIDATORS,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'global-input-password',
  standalone: true,
  imports: [CommonModule, MatIconModule, ReactiveFormsModule, FormsModule], // Add ReactiveFormsModule
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true,
    },
  ],
})
export class PasswordComponent {
  @Input() icon: string = 'mail_outline';
  @Input() type: string = 'password';
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = false;
  @Input() inputClass: string = 'w-full custom-input-class';
  @Input() labelClass: string = 'w-full form-control custom-label-class';
  @Input() errorMessage: string = '';

  value: string = '';
  showPasswrd: boolean = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  togglePasswordVisibility() {
    this.showPasswrd = !this.showPasswrd;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  handleInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.onChange(this.value);
    this.onTouched();
  }
}
