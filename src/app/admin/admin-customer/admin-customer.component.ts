import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-admin-customer',
  templateUrl: './admin-customer.component.html',
  styleUrls: ['./admin-customer.component.css']
})
export class AdminCustomerComponent implements OnInit {
  laythongtin: any[] = []; // Mảng để lưu dữ liệu khách hàng

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.GetTT(); // Gọi hàm GetTT khi khởi tạo
  }

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
}
