import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vct-customer',
  templateUrl: './vct-customer.component.html',
  styleUrl: './vct-customer.component.css'
})
export class VCTCustomerComponent  {
 // @Input() selectedCustomerId: number | null = null;
  customerData: any = {};

  constructor(private service: SharedService,  private route: ActivatedRoute) {}

  ngOnInit(): void {
    const customerId = this.route.snapshot.paramMap.get('id'); // Lấy ID từ route
    if (customerId) {
      this.GetTTCT(+customerId); // Chuyển thành số nguyên
    } else {
      console.error('Khách hàng không có ID');
    }
  }

  GetTTCT(id: number): void {
    this.service.GetTTCTKH(id).subscribe(
      (data: any) => {
        if (data.status === 'success' && Array.isArray(data.data) && data.data.length > 0) {
          this.customerData = data.data[0];
        } else {
          console.error('Không tìm thấy dữ liệu khách hàng');
          alert('Không thể lấy dữ liệu chi tiết khách hàng');
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu chi tiết khách hàng', error);
      }
    );
  }
}
