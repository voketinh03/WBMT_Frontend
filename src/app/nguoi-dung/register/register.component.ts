import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userName: any; 
  email: any;
  passWord: any;
  confirmPassword: any;

  table: any = [];
  dky: any = {
    userName: "",
    email: "",
    passWord: "",
    confirmPassword: ""
  };

  constructor(private service: SharedService) {}

  ngOnInit(): void {}

  dangKy() {
    this.dky.userName = this.userName;
    this.dky.email = this.email;
    this.dky.passWord = this.passWord;
    this.dky.confirmPassword = this.confirmPassword;

    if (this.passWord !== this.confirmPassword) {
      alert('Mật khẩu không khớp!');
      return;
    }

    this.service.dangKy(this.dky).subscribe(
      (data: any) => {
        this.table = data;
        if (this.table.status === 'success') {
          alert("Đăng ký thành công!");
          window.location.href = "http://localhost:4200/login";
        } else {
          alert("Tên đăng nhập đã tồn tại hoặc có lỗi xảy ra. Vui lòng thử lại.");
        }
      },
      (error: any) => {
        console.error('Error during registration', error);
        alert("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.");
      }
    );
  }
}

// import { Component, OnInit } from '@angular/core';
// import { SharedService } from '../../shared.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent {}

// import { Component, OnInit } from '@angular/core';
// import { SharedService } from '../../shared.service';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {
//   reuserName: string = '';
//   email: string = '';
//   repassWord: string = '';
//   confirmPassword: string = '';

//   responseData: any = {};  // Dùng để lưu phản hồi từ API
//   registrationData: { userName: string; email: string; passWord: string; confirmPassword: string } = {
//     userName: "",
//     email: "",
//     passWord: "",
//     confirmPassword: ""
//   };

//   constructor(private service: SharedService) {}

//   ngOnInit(): void {}

//   dangKy() {
//     // Gán dữ liệu từ form vào registrationData
//     this.registrationData.userName = this.reuserName;
//     this.registrationData.email = this.email;
//     this.registrationData.passWord = this.repassWord;
//     this.registrationData.confirmPassword = this.confirmPassword;

//     // Kiểm tra mật khẩu có khớp không
//     if (this.repassWord !== this.confirmPassword) {
//       alert('Mật khẩu không khớp!');
//       return;
//     }

//     // Gọi API đăng ký và xử lý phản hồi
//     this.service.dangKy(this.registrationData).subscribe(
//       (response: any) => {  // Sử dụng trực tiếp phản hồi ở đây
//         this.responseData = response;
//         if (this.responseData.status === 'success') {
//           alert("Đăng ký thành công!");
//           window.location.href = "http://localhost:4200/login";
//         } else {
//           alert(this.responseData.message || "Tên đăng nhập đã tồn tại hoặc có lỗi xảy ra. Vui lòng thử lại.");
//         }
//       },
//       (error: any) => {
//         console.error('Lỗi trong quá trình đăng ký', error);
//         alert("Có lỗi xảy ra trong quá trình đăng ký. Vui lòng thử lại sau.");
//       }
//     );
//   }
// }
