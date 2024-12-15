import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm:any;
    productName: string = '';
    brandId: number | null = null;
    categoryId: number | null = null;
    price: number | null = null; // Sử dụng string để chấp nhận các định dạng số lớn
    quantity: number | null = null;
    imageUrl: string = '';
  
    errorMessage: string | null = null; // Lưu thông báo lỗi
    successMessage: string | null = null; // Lưu thông báo thành công
    formattedPrice: string = '';
    
  
    constructor(private productService: SharedService, private router: Router) {}
  
    addProduct(): void {
      // Reset lại thông báo trước khi kiểm tra
      this.errorMessage = null;
      this.successMessage = null;
  
      // Kiểm tra điều kiện ràng buộc
      if (!this.productName || this.productName.trim().length < 3) {
        this.errorMessage = 'Tên sản phẩm phải có ít nhất 3 ký tự.';
        return;
      }
  
      if (!this.brandId || this.brandId <= 0) {
        this.errorMessage = 'ID Brand phải lớn hơn 0.';
        return;
      }
  
      if (!this.categoryId || this.categoryId <= 0) {
        this.errorMessage = 'ID Category phải lớn hơn 0.';
        return;
      }
  
      if (this.quantity === null || this.quantity <= 0) {
        this.errorMessage = 'Số lượng sản phẩm phải lớn hơn 0.';
        return;
      }
  
      if (!this.imageUrl || !/^https?:\/\/.+$/.test(this.imageUrl)) {
        this.errorMessage = 'URL hình ảnh không hợp lệ.';
        return;
      }
  
      // Nếu không có lỗi, gửi yêu cầu thêm sản phẩm
      const product = {
        productName: this.productName.trim(),
        brandId: this.brandId,
        categoryId: this.categoryId,
        price: this.price, // Loại bỏ dấu chấm trước khi parse
        quantity: this.quantity,
        imageUrl: this.imageUrl.trim(),
      };
  
      this.productService.addProduct(product).subscribe({
        next: (response: any) => {
          this.successMessage = response.message || 'Sản phẩm đã được thêm thành công!';
          this.errorMessage = null;
          this.resetForm();
  
          // Ẩn thông báo thành công sau 3 giây
          setTimeout(() => {
            this.successMessage = null;
          }, 5000);
  
          setTimeout(() => {
            this.router.navigate(['/product']); // Điều hướng về danh sách sản phẩm
          }, 2000);
        },
        error: (error: any) => {
          this.errorMessage = error.error.message || 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại!';
          this.successMessage = null;
  
          // Ẩn thông báo lỗi sau 3 giây
          setTimeout(() => {
            this.errorMessage = null;
          }, 3000);
        },
      });
    }
  
    private resetForm(): void {
      this.productName = '';
      this.brandId = null;
      this.categoryId = null;
      this.price = null;
      this.quantity = null;
      this.imageUrl = '';
    }
  
    formatPrice() {
        if (this.price) {
          this.formattedPrice = new Intl.NumberFormat('vn-VN', {
            style: 'currency',
            currency: 'VND'
          }).format(this.price);
        } else {
          this.formattedPrice = '';
        }
      }
  
    // Hàm kiểm tra định dạng giá hợp lệ
    private isValidPriceFormat(value: string): boolean {
      const priceRegex = /^\d{1,3}(\.\d{3})*$/; // Định dạng: "1.000.000"
      return priceRegex.test(value);
    }
  }