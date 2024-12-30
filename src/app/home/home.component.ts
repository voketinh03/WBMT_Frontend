import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute, Router } from '@angular/router';
//import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  productListKH: any[] = []; // Danh sách sản phẩm
  filteredProducts: any[] = []; // Danh sách sản phẩm được lọc
  pagedProducts: any[] = [];
  searchQuery: string = ''; // Từ khóa tìm kiếm
  // Phân trang
  currentPage: number = 1; // Trang hiện tại
  itemsPerPage: number =8; // Số sản phẩm mỗi trang
  totalPages: number = 1; // Tổng số trang

  constructor(private productService: SharedService, private route: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchProducts(); // Lấy danh sách sản phẩm

    // Lắng nghe thay đổi query params để thực hiện tìm kiếm
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['search'] || ''; // Lấy từ khóa tìm kiếm từ URL
      this.applySearch(); // Áp dụng tìm kiếm
    });
  }

  // Lấy danh sách sản phẩm từ API
  fetchProducts(): void {
    this.productService.getAllProducts().subscribe(
      (data: any) => {
        if (data.status === 'success') {
          this.productListKH = data.data; // Giả sử data.data là mảng sản phẩm
          this.applySearch(); // Áp dụng tìm kiếm ngay sau khi tải dữ liệu
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

  // Áp dụng tìm kiếm sản phẩm dựa trên từ khóa
  applySearch(): void {
    if (this.searchQuery.trim()) {
      // Lọc các sản phẩm dựa trên từ khóa tìm kiếm
      this.filteredProducts = this.productListKH.filter(product =>
        product.ProductName &&
        product.ProductName.toLowerCase().includes(this.searchQuery.toLowerCase())
      );

      // Nếu không có sản phẩm nào, quay lại trang Home
      if (this.filteredProducts.length === 0) {
        alert('Không tìm thấy sản phẩm nào. Quay lại trang chính.');
        this.router.navigate(['/home']); // Điều hướng quay lại trang Home
      }
    } else {
      // Nếu không có từ khóa tìm kiếm, hiển thị toàn bộ sản phẩm
      this.filteredProducts = [...this.productListKH];
    }
   // Cập nhật phân trang
   this.currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
   this.updatePagination();
  }

  // Cập nhật danh sách sản phẩm hiển thị theo phân trang
  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage); // Tính tổng số trang
    this.pagedProducts = this.filteredProducts.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  // Chuyển đến trang trước
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  // Chuyển đến trang kế tiếp
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}