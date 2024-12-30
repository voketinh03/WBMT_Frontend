import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  userName: string | null = '';
  searchTerm: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Kiểm tra xem có đang chạy trong môi trường trình duyệt hay không
    if (typeof window !== 'undefined' && localStorage) {
      const user = localStorage.getItem('userName');
      if (user) {
        this.isLoggedIn = true;
        this.userName = user;
      }
    }
  }

  dangNhap(userName: string): void {
    this.isLoggedIn = true;
    this.userName = userName;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.setItem('userName', userName); // Lưu trạng thái vào localStorage
    }
  }

  searchProducts(): void {
    // Chuyển hướng đến trang Home với từ khóa tìm kiếm
    this.router.navigate(['/home'], { queryParams: { search: this.searchTerm } });
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userName = null;
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('userName'); // Xóa trạng thái khỏi localStorage
    }
  }
}