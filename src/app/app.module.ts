import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './nguoi-dung/login/login.component';
import { RegisterComponent } from './nguoi-dung/register/register.component';
import { SharedService } from './shared.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { OrderHistoryComponent } from './admin/order-history/order-history.component';
import { AdminCustomerComponent } from './admin/admin-customer/admin-customer.component';
import { ViewCustomerComponent } from './admin/view-customer/view-customer.component';
import { EditCustomerComponent } from './admin/edit-customer/edit-customer.component';
import { VCTCustomerComponent } from './admin/vct-customer/vct-customer.component';
import { CommonModule } from '@angular/common';

//import { DeleteCustomerComponent } from './admin/delete-customer/delete-customer.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AdminComponent,
    OrderHistoryComponent,
    AdminCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    VCTCustomerComponent,
    //DeleteCustomerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    OrderHistoryComponent,
    // Cấu hình HttpClient sử dụng fetch
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


