import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vct-customer',
  templateUrl: './vct-customer.component.html',
  styleUrl: './vct-customer.component.css'
})
export class VCTCustomerComponent implements OnInit {
  layTTCT: any; // To store the customer data based on the ID
  customerId: string | null = null; // To store the customer ID from the URL
Object: any;

  constructor(
    private service: SharedService, // Your shared service to fetch data
    private route: ActivatedRoute // To retrieve the ID parameter from the route
  ) {}

  ngOnInit(): void {
    // Get the customer ID from the route parameters
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('id');  // Get the 'id' from the route
      if (this.customerId) {
        this.GetTTCTKH(this.customerId);  // Pass the ID to the service
      } else {
        console.error('Customer ID is missing');
      }
    });
  }

  // Get customer data by ID
  GetTTCTKH(id: string): void {
    this.service.GetTTCT(id).subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.layTTCT = data.data[0];  // Assuming data.data is an array and we need the first customer
        } else {
          alert('Không thể lấy dữ liệu chi tiết khách hàng');
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu chi tiết khách hàng', error);
      }
    );
  }
}
