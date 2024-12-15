import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  productList: any[] = []; // Mảng để lưu dữ liệu sản phẩm

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getAllProducts(); // Gọi hàm GetTT khi khởi tạo
  }

  getAllProducts(): void {
    this.service.getAllProducts().subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.productList = data.data; // Giả sử data.data là mảng sản phẩm
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
  
   deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.service.deleteProduct(id).subscribe({
        next: () => {
          alert('Xóa sản phẩm thành công!');
          this.getAllProducts(); // Cập nhật lại danh sách sau khi xóa
        },
        error: (error) => {
          console.error('Xóa sản phẩm thất bại:', error);
          alert('Xóa sản phẩm thất bại!');
        },
      });
    }
  }
}