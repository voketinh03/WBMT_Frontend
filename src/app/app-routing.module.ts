import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './nguoi-dung/login/login.component';
import { RegisterComponent } from './nguoi-dung/register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { OrderHistoryComponent } from './admin/order-history/order-history.component';
import { ViewCustomerComponent } from './admin/view-customer/view-customer.component';
import { EditCustomerComponent } from './admin/edit-customer/edit-customer.component';
import { VCTCustomerComponent } from './admin/vct-customer/vct-customer.component';
//import { ViewctCustomerComponent } from './admin/viewct-customer/viewct-customer.component';
//import { DeleteCustomerComponent } from './admin/delete-customer/delete-customer.component';

const routes: Routes = [
  
  {path: '', redirectTo: 'login', pathMatch: 'full'}, //Chuyển hướng đến trang dangnhap
  {path: 'login', component: LoginComponent } ,
  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin-customer', component: AdminCustomerComponent},
  { path: 'order-history', component: OrderHistoryComponent},
  { path: 'view-customer', component: ViewCustomerComponent},
  { path: 'edit-customer', component: EditCustomerComponent},
  //{ path: 'vct-customer', component: VCTCustomerComponent},
 // { path: 'delete-customer', component: DeleteCustomerComponent},

  // { path: 'home', component: HomeComponent}

    { path: 'vct-customer', component: VCTCustomerComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
