import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
//import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productListKH: any[] = []; // Danh sách sản phẩm
  searchTerm: string = '';  // Từ khóa tìm kiếm
  filteredProductList = [...this.productListKH];

  constructor(private productService: SharedService) {}

  ngOnInit(): void {
    this.fetchProducts(); // Gọi hàm lấy danh sách sản phẩm khi khởi tạo component
  }

  // Lấy danh sách sản phẩm từ API
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.productListKH = data.data; // Giả sử data.data là mảng sản phẩm
        } else {
          alert('Không thể lấy dữ liệu sản phẩm');
        }
      },
      (error: any) => {
        console.error('Lỗi khi lấy dữ liệu sản phẩm', error);
        alert('Lỗi khi kết nối với server. Vui lòng thử lại sau.');
      }
    );
  }

  // Lọc danh sách sản phẩm dựa trên từ khóa tìm kiếm
  filteredProducts(): any[] {
    if (!this.searchTerm) {
      return this.productListKH;
    }
    return this.productListKH.filter(product =>
      product.ProductName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
  onSearchChange(): void {
    if (this.searchTerm.trim() === '') {
      // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ sản phẩm
      this.filteredProductList = [...this.productListKH];
    } else {
      // Lọc sản phẩm dựa trên tên sản phẩm
      this.filteredProductList = this.productListKH.filter(product =>
        product.ProductName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}