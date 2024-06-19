import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth-compenents/signup/signup.component';
import { LoginComponent } from './auth-compenents/login/login.component';

const routes: Routes = [
  {path: "signup", component: SignupComponent},
  {path: "login", component: LoginComponent},
  {path: "admin",loadChildren:()=> import("./modules/admin/admin.module").then(m => m.AdminModule)},
  {path: "customer",loadChildren:()=> import("./modules/customer/customer.module").then(m => m.CustomerModule)},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
