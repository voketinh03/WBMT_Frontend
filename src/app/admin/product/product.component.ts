import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  productList: any[] = []; // Toàn bộ danh sách sản phẩm
  displayedProducts: any[] = []; // Danh sách sản phẩm hiển thị trên trang hiện tại
  itemsPerPage: number = 8; // Số lượng sản phẩm mỗi trang
  currentPage: number = 1; // Trang hiện tại
  totalItems: number = 0; // Tổng số sản phẩm (lấy từ server hoặc productList.length)

  constructor(private service: SharedService) {}

  ngOnInit(): void {
    this.getAllProducts(); // Gọi API lấy dữ liệu sản phẩm
  }

  getAllProducts(): void {
    this.service.getAllProducts().subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.productList = data.data; // Giả sử data.data là danh sách sản phẩm
          this.totalItems = this.productList.length; // Tổng số sản phẩm
          this.updateDisplayedProducts(); // Cập nhật sản phẩm hiển thị trên trang hiện tại
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

  updateDisplayedProducts(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedProducts = this.productList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page < 1 || page > Math.ceil(this.totalItems / this.itemsPerPage)) {
      return; // Trang không hợp lệ
    }
    this.currentPage = page;
    this.updateDisplayedProducts(); // Cập nhật danh sách hiển thị
  }

  deleteProduct(id: number): void {
    if (confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?')) {
      this.service.deleteProduct(id).subscribe({
        next: () => {
          alert('Xóa sản phẩm thành công!');
          this.getAllProducts(); // Cập nhật lại danh sách sản phẩm từ server
        },
        error: (error) => {
          console.error('Xóa sản phẩm thất bại:', error);
          alert('Xóa sản phẩm thất bại!');
        },
      });
    }
  }
}