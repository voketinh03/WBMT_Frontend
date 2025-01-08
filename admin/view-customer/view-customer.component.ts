import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent  implements OnInit {
    laythongtinn: any[] = []; // Mảng để lưu dữ liệu khách hàng
    
    constructor(private service: SharedService) {}
  
    ngOnInit(): void {
      this.GetTTKH(); // Gọi hàm GetTT khi khởi tạo
    }
  
    GetTTKH(): void {
      this.service.GetTTKH().subscribe(
        (data: any) => {
          if (data.status === 'success') {
            this.laythongtinn = data.data; // Giả sử data.data là mảng khách hàng
          } else {
            alert('Không thể lấy dữ liệu khách hàng');
          }
        },
        (error: any) => {
          console.error('Lỗi khi lấy dữ liệu khách hàng', error);
        }
      );
    }
  }
