import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './nguoi-dung/login/login.component';
import { RegisterComponent } from './nguoi-dung/register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { OrderHistoryComponent } from './admin/order-history/order-history.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'login', pathMatch: 'full'}, //Chuyển hướng đến trang dangnhap
  {path: 'login', component: LoginComponent } ,
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin-customer', component: AdminCustomerComponent},
  { path: 'order-history', component: OrderHistoryComponent}
  // { path: 'home', component: HomeComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
