import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth-service/auth-serive/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  isSpinning: boolean;
  hidePassword = true;

  constructor(private service: AuthService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm(): void {
    this.service.login(this.loginForm.value).subscribe((res)=>{
      console.log(res);
    })
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
