import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'] // Sửa "styleUrl" thành "styleUrls"
})
export class ProductDetailComponent implements OnInit {
  // productListctsp: any; // Lưu thông tin chi tiết sản phẩm
  
  // constructor(
  //   private route: ActivatedRoute,
  //   private productService: ProductService
  // ) {}

  // ngOnInit(): void {
  //   this.getProductDetail();
  // }

  // // Lấy thông tin chi tiết sản phẩm
  // getProductDetail(): void {
  //   const productId = this.route.snapshot.paramMap.get('id'); // Lấy ProductId từ URL
  //   if (productId) {
  //     const id = Number(productId); // Chuyển đổi ProductId thành kiểu số
  //     this.productService.getProductById(id).subscribe({
  //       next: (data) => {
  //         this.productListctsp = data; // Lưu thông tin sản phẩm chi tiết
  //       },
  //       error: (err) => {
  //         console.error('Error fetching product details:', err); // Log lỗi nếu xảy ra
  //       }
  //     });
  //   } else {
  //     console.error('ProductId is not available in the route parameters');
  //   }
  // }
  productDetail: any; // Biến lưu chi tiết sản phẩm

  constructor(
    private route: ActivatedRoute,
    private productService: SharedService
  ) {}

  ngOnInit(): void {
    this.getProductDetail();
  }

  // Hàm lấy thông tin chi tiết sản phẩm
  getProductDetail(): void {
    const productId = this.route.snapshot.paramMap.get('id'); // Lấy id từ URL
    if (productId) {
      this.productService.getProductById(Number(productId)).subscribe({
        next: (data) => {
          this.productDetail = data; // Lưu chi tiết sản phẩm
        },
        error: (err) => {
          console.error('Error fetching product details:', err);
          alert('Không thể lấy thông tin sản phẩm. Vui lòng thử lại.');
        }
      });
    } else {
      console.error('Product ID is missing in the URL.');
    }
  }
}