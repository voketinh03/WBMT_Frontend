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
  formattedPrice: string = '';
  productName: string = '';
  brandId: number | null = null;
  selectedBrandName: string = '';
  categoryId: number | null = null;
  price: number | null = null;
  quantity: number | null = null;
  imageUrl: string = '';

  errorMessage: string | null = null;
  successMessage: string | null = null;
  brandList: any[] = [];
  loading: boolean = false;

  constructor(private productService: SharedService, private router: Router) {}

  ngOnInit(): void {
    this.loading = true;

    // Lấy danh sách thương hiệu từ API
    this.productService.getBrands().subscribe(
      (response) => {
        if (response && Array.isArray(response.data)) {
          this.brandList = response.data;
        } else {
          console.error('Dữ liệu không hợp lệ: ', response);
        }
        this.loading = false;
      },
      (error) => {
        console.error('Có lỗi xảy ra khi tải dữ liệu:', error);
        this.loading = false;
      }
    );
  }

  onBrandSelect(): void {
    // Lấy tên thương hiệu khi người dùng chọn
    const selectedBrand = this.brandList.find(brand => brand.BrandId === this.brandId);
    if (selectedBrand) {
      this.selectedBrandName = selectedBrand.BrandName;  // Lưu tên thương hiệu đã chọn
    }
  }

  addProduct(): void {
    this.errorMessage = null;
    this.successMessage = null;

    // Kiểm tra dữ liệu đầu vào
    if (!this.productName || this.productName.trim().length < 3) {
      this.errorMessage = 'Tên sản phẩm phải có ít nhất 3 ký tự.';
      return;
    }

    if (!this.brandId || this.brandId <= 0) {
      this.errorMessage = 'ID Thương hiệu phải lớn hơn 0.';
      return;
    }

    if (!this.categoryId || this.categoryId <= 0) {
      this.errorMessage = 'ID Danh mục phải lớn hơn 0.';
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

    const product = {
      productName: this.productName.trim(),
      brandId: this.brandId,
      categoryId: this.categoryId,
      price: this.price,
      quantity: this.quantity,
      imageUrl: this.imageUrl.trim()
    };

    this.productService.addProduct(product).subscribe({
      next: (response: any) => {
        if (response.message === 'Tên sản phẩm đã tồn tại trong cơ sở dữ liệu.') {
          this.errorMessage = response.message;
          return;
        }
        this.successMessage = response.message || 'Sản phẩm đã được thêm thành công!';
        this.errorMessage = null;

        setTimeout(() => {
          this.successMessage = null;
          this.router.navigate(['/product']);
        }, 2000);
      },
      error: (error: any) => {
        this.errorMessage = error.error.message || 'Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại!';
        this.successMessage = null;

        setTimeout(() => {
          this.errorMessage = null;
        }, 3000);
      }
    });
  }

  private resetForm(): void {
    this.productName = '';
    this.brandId = null;
    this.selectedBrandName = '';
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
}