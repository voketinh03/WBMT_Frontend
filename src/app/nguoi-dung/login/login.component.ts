import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: string = '';
  passWord: string = '';

  table: any = [];
  nDung: any = {
    userName: "",
    passWord: "",
  };

  constructor(private service: SharedService) {}

  ngOnInit(): void {}

  dangNhap() {
    if (!this.userName.trim() && !this.passWord.trim()) {
      alert('Vui lòng điền đầy đủ tên đăng nhập và mật khẩu!');
    } else if (!this.userName.trim()) {
      alert('Tên đăng nhập không được để trống!');
    } else if (!this.passWord.trim()) {
      alert('Mật khẩu không được để trống!');
    } 
    

    // Gán dữ liệu vào đối tượng nDung
    this.nDung.userName = this.userName;
    this.nDung.passWord = this.passWord;

    // Gọi service để thực hiện đăng nhập
    this.service.dangNhap(this.nDung).subscribe(
      (data: any) => {
        this.table = data;

        if (this.table.status === 'success') {
          alert("Đăng nhập thành công!");
           // Lưu tên người dùng vào localStorage sau khi đăng nhập thành công
      
         // Lưu thông tin vào localStorage
        localStorage.setItem('userName', this.userName);
        console.log('Lưu userName vào localStorage:', this.userName);
         // Cập nhật trạng thái đăng nhập trong SharedService
         this.service.updateLoginStatus(true);
         console.log('Cập nhật trạng thái đăng nhập thành công.');
         
          // Điều hướng dựa trên vai trò người dùng
          if (this.table.data.roleName === 'admin') {
            window.location.href = "http://localhost:4200/admin";
          } else {
            window.location.href = "http://localhost:4200/home";
          }
        } else {
          alert("Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng nhập lại");
        }
      },
      (error: any) => {
        console.error('Error during login', error);
        alert("Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại sau.");
      }
    );
  }
  
  
}
