import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
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
    // Lấy ID từ URL
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.getProductDetails(this.productId);
    }
  }

  getProductDetails(id: number): void {
    this.productService.getProductById(id).subscribe({
      next: (product) => {
        this.productData = {
          productName: product.productName,
          brandId: product.brandId,
          categoryId: product.ategoryId,
          price: product.price,
          quantity: product.quantity,
          imageUrl: product.imageUrl,
        };
      },
      error: (error) => {
        console.error('Lỗi khi lấy thông tin sản phẩm:', error);
      },
    });
  }
// Hàm xử lý giá nhập vào
onPriceInput(event: any): void {
  let inputValue = event.target.value;

  // Remove all non-numeric characters except the decimal point
  inputValue = inputValue.replace(/[^0-9.]/g, '');

  // Allow only one decimal point
  const decimalCount = (inputValue.match(/\./g) || []).length;
  if (decimalCount > 1) {
    inputValue = inputValue.slice(0, inputValue.lastIndexOf('.'));
  }

  // Limit to 2 decimal places
  if (inputValue.includes('.')) {
    const [integer, decimal] = inputValue.split('.');
    if (decimal.length > 2) {
      inputValue = `${integer}.${decimal.slice(0, 2)}`;
    }
  }

  // Update the model with the corrected value
  this.productData.price = inputValue;

  // Set the value back to the input element if needed
  event.target.value = this.productData.price;
}


  updateProduct(form: NgForm): void {
    // Check if the productId is valid and available
    if (!this.productId) {
      this.errorMessage = 'Sản phẩm không tồn tại hoặc không được xác định.';
      return;
    }
  
    const { productName, brandId, categoryId, price, quantity, imageUrl } = this.productData;
    const updatePayload = { productName, brandId, categoryId, price, quantity, imageUrl };
  
    this.productService.updateProduct(this.productId, updatePayload).subscribe({
      next: (response) => {
        console.log('API Response:', response);
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
