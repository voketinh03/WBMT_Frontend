import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent  implements OnInit {
  productId: number | null = null;
  productData: any = {
    productName: '',
    brandId: 0,
    categoryId: 0,
    price: 0,
    quantity: 0,
    imageUrl: '',
  };
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: SharedService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      console.log('Getting product details for ID:', this.productId); // Kiểm tra ID
      this.getProductDetails(this.productId);
    } else {
      this.errorMessage = 'ID sản phẩm không hợp lệ!';
    }
  }
  
  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        console.log('Product details:', product);  // Kiểm tra dữ liệu trả về
        this.productData = {
          productName: product.ProductName,  // Đảm bảo rằng tên trường trong API là đúng
          brandId: product.BrandId,
          categoryId: product.CategoryId,
          price: product.Price,
          quantity: product.Quantity,
          imageUrl: product.ImageUrl,
        };
      },
      error: (error) => {
        console.error('Error fetching product:', error);
        this.errorMessage = 'Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.';
      }
    });
  }

  // Hàm xử lý khi người dùng chỉnh sửa giá
  onPriceInput(event: any): void {
    let inputValue = event.target.value;

    // Loại bỏ các ký tự không phải số, ngoại trừ dấu chấm
    inputValue = inputValue.replace(/[^0-9.]/g, '');

    // Cho phép chỉ một dấu chấm
    const decimalCount = (inputValue.match(/\./g) || []).length;
    if (decimalCount > 1) {
      inputValue = inputValue.slice(0, inputValue.lastIndexOf('.'));
    }

    // Giới hạn chỉ 2 chữ số thập phân
    if (inputValue.includes('.')) {
      const [integer, decimal] = inputValue.split('.');
      if (decimal.length > 2) {
        inputValue = `${integer}.${decimal.slice(0, 2)}`;
      }
    }

    // Cập nhật giá trị cho model
    this.productData.price = inputValue;

    // Đặt giá trị lại cho input
    event.target.value = this.productData.price;
  }

  // Hàm cập nhật sản phẩm
  updateProduct(form: NgForm): void {
    if (!this.productId) {
      this.errorMessage = 'Sản phẩm không tồn tại hoặc không được xác định.';
      return;
    }

    const { productName, brandId, categoryId, price, quantity, imageUrl } = this.productData;
    const updatePayload = { productName, brandId, categoryId, price, quantity, imageUrl };

    this.productService.updateProduct(this.productId, updatePayload).subscribe({
      next: (response) => {
        this.successMessage = 'Sản phẩm đã được cập nhật thành công!';
        setTimeout(() => {
          this.router.navigate(['/product']);
        }, 2000);
      },
      error: (error) => {
        console.error('API Error:', error);
        if (error.status === 404) {
          this.errorMessage = 'Sản phẩm không tồn tại.';
        } else if (error.status === 500) {
          this.errorMessage = 'Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.';
        } else {
          this.errorMessage = 'Đã xảy ra lỗi khi cập nhật sản phẩm.';
        }
      },
    });
  }
}