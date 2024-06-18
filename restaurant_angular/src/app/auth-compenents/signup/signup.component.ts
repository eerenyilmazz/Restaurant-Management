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

  isSpinning: boolean;
  validateForm: FormGroup;

  constructor(
    private service: AuthService, 
    private fb: FormBuilder,
    private notification:NzNotificationService
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')]],
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
    if (this.validateForm.valid) {
      console.log(this.validateForm.value);
      this.service.signup(this.validateForm.value).subscribe((res) => {
        console.log(res);
        if(res.id!=null)
          {
            this.notification.success("SUCCESSFUL!","You're registered successfully",{nzDuration:5000});
          } else {
            this.notification.success("ERROR!","Something went wrong!",{nzDuration:5000});

          }
      });
    } else {
      console.error("Form is not valid");
    }
  }
}
