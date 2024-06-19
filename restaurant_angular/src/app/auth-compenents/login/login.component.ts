import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StorageService } from 'src/app/auth-service/storage-service/storage.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service/auth-serive/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSpinning = false;
  hidePassword = true;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm(): void {
    if (this.loginForm.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isSpinning = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login response:', res);
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: res.userRole
          };
          console.log('User details:', user);
          this.storageService.saveToken(res.jwt);
          this.storageService.saveUser(user);
          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl('admin/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl('customer/dashboard');
          }
        } else {
          console.error('Wrong credentials.');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
      },
      complete: () => {
        this.isSpinning = false;
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
