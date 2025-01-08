import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sua-danh-muc',
  templateUrl: './sua-danh-muc.component.html',
  styleUrls: ['./sua-danh-muc.component.css']
})
export class SuaDanhMucComponent implements OnInit {

  categoryData: any = {}; // This will hold the data for the category
  Id: number | null = null; // ID of the category to be edited

  constructor(
    private route: ActivatedRoute,
    private service: SharedService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get category_id from the route parameters
    this.Id = +this.route.snapshot.paramMap.get('category_id')!;

    // Fetch the category data by ID from the API
    if (this.Id) {
      this.service.getDanhMucById(this.Id).subscribe(
        (data: any) => {
          if (data.status === 'success' && data.data && data.data.length > 0) {
            this.categoryData = data.data[0]; // Set the first category
          } else {
            this.toastr.error('Không tìm thấy danh mục với ID đã cho.');
          }
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
          this.toastr.error('Đã xảy ra lỗi khi tải dữ liệu.');
        }
      );
    } else {
      this.toastr.error('ID danh mục không hợp lệ.');
    }
  }

  // Validate the input fields before submitting
  validateInput(): boolean {
    let isValid = true;
    let errorMessages: string[] = [];

    // Check if required fields are filled
    if (!this.categoryData.CategoryName) {
      errorMessages.push('Tên danh mục không được bỏ trống!');
      isValid = false;
    }
    if (!this.categoryData.Description) {
      errorMessages.push('Mô tả không được bỏ trống!');
      isValid = false;
    }

    // If there are errors, display them
    if (!isValid) {
      alert(errorMessages.join('\n')); // Show all error messages
    }

    return isValid;
  }

  // Update the category information
  updateDanhMuc(): void {
    if (this.Id) {
      // Validate input before updating
      if (!this.validateInput()) {
        return;  // If invalid, stop updating
      }

      // Prepare the category data to be updated
      const updatedCategory = {
        //category_id: this.categoryData.category_id,
        category_name: this.categoryData.CategoryName,
        description: this.categoryData.Description
      };

      // Call the update service method
      this.service.suaDanhMuc(this.Id, updatedCategory).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('Cập nhật thông tin danh mục thành công!');
            this.router.navigate(['/ds-d-muc']);  // Redirect to the list after update
          } else {
            this.toastr.error(`Lỗi: ${response.message}`);
          }
        },
        (error: any) => {
          console.error('Lỗi khi cập nhật thông tin danh mục:', error);
          alert('Đã xảy ra lỗi khi cập nhật danh mục.');
        }
      );
    } else {
      this.toastr.error('ID danh mục không hợp lệ.');
    }
  }
}
