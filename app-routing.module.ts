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
import { OrderctComponentComponent } from './admin/orderct-component/orderct-component.component';
import { DanhMucComponent } from './admin/danh-muc/danh-muc.component';
import { ThemSuaDMucComponent } from './admin/danh-muc/them-sua-d-muc/them-sua-d-muc.component';
import { DsDMucComponent } from './admin/danh-muc/ds-d-muc/ds-d-muc.component';
// import { ProductComponent } from './admin/product/product.component';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { ProductComponent } from './admin/product/product.component';
import { HeaderComponent } from './admin/header/header.component';
import { ProductDetailComponent } from './home/product-detail/product-detail.component';
import { EditProductComponent } from './admin/edit-product/edit-product.component';
import { SuaDanhMucComponent } from './admin/danh-muc/sua-danh-muc/sua-danh-muc.component';
import { VctCategoryComponent } from './admin/danh-muc/sua-danh-muc/vct-category/vct-category.component';
//import { DsBookComponent } from './admin/ds-book/ds-book.component';
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
  { path: 'edit-customer/:id', component: EditCustomerComponent},
  { path: 'vct-customer/:id', component: VCTCustomerComponent},
  { path: 'orderct-component/:id', component: OrderctComponentComponent},
  {path: 'danhmuc', component: DanhMucComponent },
  {path: 'danhmuc/them-sua-d-muc', component: ThemSuaDMucComponent},
  {path: 'ds-d-muc', component: DsDMucComponent },
  { path: 'product', component: ProductComponent},
  { path: 'add-product', component: AddProductComponent},
  { path: 'edit-product/:id', component: EditProductComponent},
  { path: 'product-detail/:id', component: ProductDetailComponent},
  { path: 'sua-danh-muc/:category_id', component: SuaDanhMucComponent},
  { path: 'vct-category/:category_id', component: VctCategoryComponent}
//  { path: 'ds-book', component: DsBookComponent},
//  { path: 'them-sua-book', component: DsBookComponent},
 
  
 
 // { path: 'delete-customer', component: DeleteCustomerComponent},

  // { path: 'home', component: HomeComponent}

    
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
