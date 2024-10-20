import {
  Component,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  selector: 'global-captcha',
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './captcha.component.html',
  styleUrls: ['./captcha.component.scss'],
})
export class CaptchaComponent implements AfterViewInit {
  @Input() label: string = 'Captcha';
  @Input() placeholder: string = 'Input here';
  @Input() labelClass: string = 'w-full form-control';
  @Input() inputClass: string = 'w-full';
  @Input() type: string = 'text';
  @Input() icon: string = 'mail_outline';
  @Input() required: boolean = true;

  @Output() captchaVerified = new EventEmitter<boolean>(); // Emit verification result

  captcha: string = '';
  captchaControl = new FormControl('', Validators.required);
  verificationMessage: string = '';

  // ViewChild to reference the canvas element in the template
  @ViewChild('captchaCanvas', { static: false })
  captchaCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    this.generateCaptcha();
  }

  ngAfterViewInit(): void {
    // Check if the app is running in the browser (client-side)
    if (isPlatformBrowser(this.platformId)) {
      this.drawCaptcha();
    }
  }

  updateVerificationMessage(value: Event) {
    if (this.captchaControl.hasError('required')) {
      this.verificationMessage = 'CAPTCHA is required';
    } else {
      this.verificationMessage = '';
    }
  }

  // Generate random CAPTCHA (6 characters)
  generateCaptcha() {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    this.captcha = '';
    for (let i = 0; i < 6; i++) {
      this.captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  }

  generateNewCaptcha(): void {
    this.generateCaptcha();
    this.drawCaptcha();
    this.verificationMessage = '';
    this.captchaControl.setValue('');
  }

  // Draw the CAPTCHA onto the canvas (only run this on the browser)
  drawCaptcha(): void {
    const canvas = this.captchaCanvas.nativeElement;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas dimensions
    canvas.width = 150;
    canvas.height = 50;

    // Generate background noise (gradient)
    context.fillStyle = '#000842';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the CAPTCHA text
    context.font = '30px Arial';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#fff'; // Text color
    context.fillText(this.captcha, canvas.width / 2, canvas.height / 2);

    // Optionally add some noise (e.g., random dots)
    for (let i = 0; i < 20; i++) {
      context.fillStyle = this.getRandomColor();
      context.beginPath();
      context.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5, // Random size for noise
        0,
        Math.PI * 2
      );
      context.fill();
    }
  }

  // Generate random colors for noise dots
  getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  // Verify if the entered CAPTCHA matches
  verifyCaptcha() {
    const isMatch = this.captchaControl.value === this.captcha;
    this.captchaVerified.emit(isMatch); // Emit verification result
    if (isMatch) {
      this.verificationMessage = '';
    } else if (this.captchaControl.hasError('required')) {
      this.verificationMessage = 'CAPTCHA is required';
    } else if (this.captchaControl.value !== this.captcha) {
      this.verificationMessage = 'CAPTCHA failed. Please try again.';
    }
  }
}
