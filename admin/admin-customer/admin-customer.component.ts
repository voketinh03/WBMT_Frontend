import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit {
  laythongtin: any[] = []; // Mảng để lưu dữ liệu khách hàng

  constructor(
    private service: SharedService,
    private toastr: ToastrService,
    private router: Router // Sử dụng đúng kiểu
  ) {}

  ngOnInit(): void {
    this.GetTT(); // Gọi hàm GetTT khi khởi tạo
  }
 // Khi khách hàng được chọn, set selectedCustomerId và điều hướng đến component chi tiết
  GetTT(): void {
    this.service.GetTT().subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.laythongtin = data.data; // Giả sử data.data là mảng khách hàng
        } else {
          alert('Không thể lấy dữ liệu khách hàng');
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu khách hàng', error);
      }
    );
  }
  onSelectCustomer(customerId: number): void {
    this.router.navigate(['/vct-customer', customerId]); // Điều hướng đến VCTCustomerComponent kèm ID
  }
  onEditCustomer(customerId: number): void {
    this.router.navigate(['/edit-customer', customerId]); // Điều hướng đến VCTCustomerComponent kèm ID
  } 
  GetOrderDetails(orderId: number): void {
    this.router.navigate(['/edit-customer', orderId]); // Điều hướng đến VCTCustomerComponent kèm ID
  }
   // Xóa khách hàng
   deleteCustomer(customer: any): void {
    if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${customer.UserName}?`)) {
      this.service.DeleteCustomer(customer.Id).subscribe(
       
        (response: any) => {
        //  console.log('API response:', response); // Log phản hồi từ API
          if (response?.status === 'success') {
            alert("Xóa khách hàng thành công!");
            this.GetTT(); // Tải lại danh sách sau khi xóa
          } else {
            alert('Không thể xóa khách hàng');
          }
        },
        (error: any) => {
          console.error('Lỗi khi xóa khách hàng:', error);
          this.toastr.error('Xảy ra lỗi trong quá trình xóa khách hàng');
        }
      );
    }
  }
}
