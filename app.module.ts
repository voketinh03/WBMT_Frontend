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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OrderctComponentComponent } from './admin/orderct-component/orderct-component.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { DanhMucComponent } from './admin/danh-muc/danh-muc.component';
import { DsDMucComponent } from './admin/danh-muc/ds-d-muc/ds-d-muc.component';
import { ThemSuaDMucComponent } from './admin/danh-muc/them-sua-d-muc/them-sua-d-muc.component';
import { ProductComponent } from './admin/product/product.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { HeaderComponent } from './admin/header/header.component';
import { FooterComponent } from './admin/footer/footer.component';
import { ProductDetailComponent } from './home/product-detail/product-detail.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { SuaDanhMucComponent } from './admin/danh-muc/sua-danh-muc/sua-danh-muc.component';
import { VctCategoryComponent } from './admin/danh-muc/sua-danh-muc/vct-category/vct-category.component';
//import { VCTCategoryComponent } from './admin/danh-muc/sua-danh-muc/vct-category/vct-category.component';
//import { VctCategoryComponent } from './admin/danh-muc/sua-danh-muc/vct-category/vct-category.component';
// import { DsBookComponent } from './admin/ds-book/ds-book.component';
// import { ThemSuaBookComponent } from './admin/them-sua-book/them-sua-book.component';
// import { DsOdersComponent } from './admin/ds-oders/ds-oders.component';
// import { ThemSuaOdersComponent } from './admin/them-sua-oders/them-sua-oders.component';


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
    OrderctComponentComponent,
    CategoriesComponent,
    DanhMucComponent,
    DsDMucComponent,
    ThemSuaDMucComponent,
    ProductComponent,
    AddProductComponent,
    EditProductComponent,
    HeaderComponent,
    FooterComponent,
    ProductDetailComponent,
    SuaDanhMucComponent,
    VctCategoryComponent
    //VCTCategoryComponent
  //  VctCategoryComponent
    // DsBookComponent,
    // ThemSuaBookComponent,
   // DsOdersComponent,
   // ThemSuaOdersComponent
    
    //DeleteCustomerComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot(), // Thêm ToastrModule
  ],
  providers: [
    OrderHistoryComponent,
    // Cấu hình HttpClient sử dụng fetch
    provideHttpClient(withFetch(), withInterceptorsFromDi())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


