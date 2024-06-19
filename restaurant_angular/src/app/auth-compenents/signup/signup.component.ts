import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { AuthService } from 'src/app/auth-service/auth-serive/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  isSpinning = false;
  validateForm: FormGroup;

  constructor(
    private authService: AuthService, 
    private fb: FormBuilder,
    private notification: NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
      ]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]] 
    });
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } | null => {
    if (!control.value) {
      return { required: true };
    }
    const password = this.validateForm.get('password');
    if (password && control.value !== password.value) {
      return { confirm: true, error: true };
    }
    return null;
  };

  register(): void {
    if (this.validateForm.invalid) {
      console.error("Form is not valid");
      this.notification.error("ERROR!", "Form validation failed. Please check your inputs.", { nzDuration: 5000 });
      return;
    }

    this.isSpinning = true;

    this.authService.signup(this.validateForm.value).subscribe({
      next: (res) => {
        console.log('Signup response:', res);
        if (res.id != null) {
          this.notification.success("SUCCESSFUL!", "You're registered successfully", { nzDuration: 5000 });
        } else {
          this.notification.error("ERROR!", "Something went wrong during registration!", { nzDuration: 5000 });
        }
      },
      error: (err) => {
        console.error('Signup error:', err);
        this.notification.error("ERROR!", "An error occurred during registration. Please try again later.", { nzDuration: 5000 });
      },
      complete: () => {
        this.isSpinning = false;
      }
    });
  }
}
