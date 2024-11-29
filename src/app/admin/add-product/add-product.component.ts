// add-product.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productName: string = '';
  brandId: number | null = null;
  categoryId: number | null = null;
  price: number | null = null;
  quantity: number | null = null;
  imageUrl: string = '';

  errorMessage: string | null = null; // Lưu thông báo lỗi
  successMessage: string | null = null; // Lưu thông báo thành công

  constructor(private sharedService: SharedService) {}

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
  
    if (this.price === null || this.price <= 0) {
      this.errorMessage = 'Giá sản phẩm phải lớn hơn 0.';
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
      price: this.price,
      quantity: this.quantity,
      imageUrl: this.imageUrl.trim(),
    };
  
    this.sharedService.addProduct(product).subscribe({
      error: () => {
        this.successMessage = 'Sản phẩm đã được thêm thành công!';
        this.errorMessage = null; // Xóa thông báo lỗi nếu có
        this.resetForm();
  
        // Ẩn thông báo thành công sau 3 giây
        setTimeout(() => {
          this.successMessage = null;
        }, 3000);
      },
      next: () => {
        this.errorMessage = 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại!';
        this.successMessage = null; // Xóa thông báo thành công nếu có
  
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
}
