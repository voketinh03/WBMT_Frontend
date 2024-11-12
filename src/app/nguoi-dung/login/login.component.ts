import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userName: any;
  passWord: any;

  table: any = [];
  nDung: any = {
    userName: "",
    passWord: "",
  };

  constructor(private service: SharedService) {}

  ngOnInit(): void {}

  dangNhap() {
    this.nDung.userName = this.userName;
    this.nDung.passWord = this.passWord;
    this.service.dangNhap(this.nDung).subscribe(
      (data: any) => {
        this.table = data;
        if (this.table.status === 'success') {
          alert("Đăng nhập thành công!");
          //window.location.href = "http://localhost:4200/home";
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
