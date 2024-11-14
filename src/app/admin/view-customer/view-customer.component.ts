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


// export class ViewCustomerComponent implements OnInit {
//   laythongtinn: any;  // Để lưu dữ liệu chi tiết khách hàng
  
//   constructor(
//     private service: SharedService,
//     private route: ActivatedRoute  // Inject ActivatedRoute để lấy tham số từ URL
//   ) {}

//   ngOnInit(): void {
//     const id = this.route.snapshot.paramMap.get('id');  // Lấy ID từ URL
//     if (id) {
//       this.GetTTKH(id);  // Gọi hàm lấy chi tiết khách hàng theo ID
//     }
//   }

//   GetTTKH(id: string): void {
//     this.service.GetTTKH(id).subscribe(
//       (data: any) => {
//         if (data.status === 'success') {
//           this.laythongtinn = data.data[0];  // Chỉ có 1 khách hàng nên lấy phần tử đầu tiên
//         } else {
//           alert('Không thể lấy dữ liệu chi tiết khách hàng');
//         }
//       },
//       (error: any) => {
//         console.error('Lỗi khi lấy dữ liệu chi tiết khách hàng', error);
//       }
//     );
//   }
// }

