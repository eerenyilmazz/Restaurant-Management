import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/auth-serive/auth.service';
import { StorageService } from 'src/app/auth-service/storage-service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isSpinning: boolean;
  hidePassword = true;

  constructor(private service: AuthService,
              private fb: FormBuilder,
              private storageService: StorageService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm(): void {
    this.service.login(this.loginForm.value).subscribe((res) => {
      console.log(res);
      if (res.userId != null) {
        const user = {
          id: res.userId,
          role: res.userRole
        };
        console.log(user);
        this.storageService.saveToken(res.jwt);
        this.storageService.saveUser(user);
      } else {
        console.log("Wrong credentials.");
      }
    });
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
