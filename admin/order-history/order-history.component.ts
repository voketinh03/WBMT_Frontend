import { Component } from '@angular/core';
import { SharedService } from '../../shared.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css'
})
export class OrderHistoryComponent implements OnInit {
  laydh: any[] = []; // Mảng để lưu dữ liệu khách hàng
    

   
  
  constructor(private service: SharedService) {}

  ngOnInit(): void { 
    this.GetLSDH(); // Gọi hàm GetTT khi khởi tạo
  }

  GetLSDH(): void {
    this.service.GetLSDH().subscribe(
      (data: any) => {
        console.log(data); // Kiểm tra dữ liệu trả về
        if (data.status === 'success') {
          this.laydh = data.data; 
        } else {
          alert('Không thể lấy dữ liệu ');
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu ', error);
      }
    );
  }
  
}
