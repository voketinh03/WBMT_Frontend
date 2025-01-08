import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
  customerData: any = {}; // Lưu trữ thông tin khách hàng
  Id: number | null = null; // ID của khách hàng cần chỉnh sửa

  constructor(
    private route: ActivatedRoute,
    private service: SharedService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.Id = +this.route.snapshot.paramMap.get('id')!;

    if (this.Id) {
      // Lấy thông tin khách hàng từ API
      this.service.GetTTCTKH(this.Id).subscribe(
        (data: any) => {
          if (data.status === 'success') {
            const customer = data.data.find((c: any) => c.Id === this.Id);
            if (customer) {
              this.customerData = customer;
            } else {
              this.toastr.error('Không tìm thấy khách hàng với ID đã cho.');
            }
          } else {
            this.toastr.error('Lỗi khi tải dữ liệu khách hàng.');
          }
        },
        (error) => {
          console.error('Lỗi khi gọi API:', error);
          this.toastr.error('Đã xảy ra lỗi.');
        }
      );
    } else {
      alert('ID khách hàng không hợp lệ.');
    }
  }

  // Kiểm tra dữ liệu đầu vào
validateInput(): boolean {
  let isValid = true; // Theo dõi trạng thái hợp lệ
  let errorMessages: string[] = []; // Danh sách lỗi

  // Kiểm tra các trường bắt buộc không được bỏ trống
  if (!this.customerData.UserName) {
    errorMessages.push('Tên đăng nhập không được bỏ trống!');
    isValid = false;
  }
  if (!this.customerData.Email) {
    errorMessages.push('Email không được bỏ trống!');
    isValid = false;
  }
  if (!this.customerData.Phone) {
    errorMessages.push('Số điện thoại không được bỏ trống!');
    isValid = false;
  }
  if (!this.customerData.Password) {
    errorMessages.push('Mật khẩu không được bỏ trống!');
    isValid = false;
  }
  if (!this.customerData.Address) {
    errorMessages.push('Địa chỉ không được bỏ trống!');
    isValid = false;
  }

  // Kiểm tra email hợp lệ
  const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  if (this.customerData.Email && !emailRegex.test(this.customerData.Email)) {
    errorMessages.push('Địa chỉ email không hợp lệ!');
    isValid = false;
  }

  // Kiểm tra số điện thoại hợp lệ (chỉ chứa số, độ dài 10 ký tự)
  const phoneRegex = /^\d{10}$/;
  if (this.customerData.Phone && !phoneRegex.test(this.customerData.Phone)) {
    errorMessages.push('Số điện thoại phải chứa 10 ký tự số!');
    isValid = false;
  }

  // Kiểm tra tên đăng nhập (phải chứa cả chữ và số)
  const usernameRegex = /^(?=.*[a-zA-Z])(?=.*\d).+$/;
  if (this.customerData.UserName && !usernameRegex.test(this.customerData.UserName)) {
    errorMessages.push('Tên đăng nhập phải chứa cả chữ và số!');
    isValid = false;
  }

  // Nếu có lỗi, hiển thị tất cả thông báo lỗi
  if (!isValid) {
    alert(errorMessages.join('\n')); // Hiển thị tất cả lỗi trong một alert
  }

  return isValid;
}

  // Cập nhật thông tin khách hàng
  updateCustomer() {
    if (this.Id) {
      // Gọi hàm validateInput để kiểm tra dữ liệu
      if (!this.validateInput()) {
        return; // Nếu không hợp lệ, dừng quá trình cập nhật
      }

      this.service.UpdateKH(this.Id, this.customerData).subscribe(
        (response: any) => {
          if (response.status === 'success') {
            alert('Cập nhật thông tin khách hàng thành công!');
          } else {
            this.toastr.error(`Lỗi: ${response.message}`);
          }
        },
        (error: any) => {
          console.error('Lỗi khi cập nhật thông tin khách hàng:', error);
          this.toastr.error('Đã xảy ra lỗi.');
        }
      );
    } else {
      this.toastr.error('ID khách hàng không hợp lệ.');
    }
  }
}
