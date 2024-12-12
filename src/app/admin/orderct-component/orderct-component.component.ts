import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service'; // Import your service to fetch data

@Component({
  selector: 'app-orderct-component',
  templateUrl: './orderct-component.component.html',
  styleUrls: ['./orderct-component.component.css'] // Corrected the styleUrls to be plural
})
export class OrderctComponentComponent implements OnInit {
  orderData: any = {}; // Object to hold order details

  constructor(
    private service: SharedService, // Your service to fetch data
    private route: ActivatedRoute // Used to get the order ID from the route
  ) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id'); // Fetch the order ID from the URL
    if (orderId) {
      this.GetOrderDetails(+orderId); // Fetch order details when component initializes
    } else {
      console.error('Không có id');
    }
  }

  // Fetch order details based on order ID
  GetOrderDetails(Id: number): void {
    this.service.GetOrderDetail(Id).subscribe(
      (data: any) => {
        if (data.status === 'success' && data.data) {
          this.orderData = data.data; // Assuming data.data holds the order information
        } else {
          console.error('No order details found');
          alert('Could not retrieve order details');
        }
      },
      (error: any) => {
        console.error('Error fetching order details', error);
        alert('An error occurred while fetching order details');
      }
    );
  }
}
 