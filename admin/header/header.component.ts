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

  constructor() {}

  ngOnInit(): void {
    // Kiểm tra trạng thái từ localStorage hoặc sessionStorage
    const user = localStorage.getItem('userName');
    if (user) {
      this.isLoggedIn = true;
      this.userName = user;
    }
  }

  dangNhap(userName: string): void {
    this.isLoggedIn = true;
    this.userName = userName;
    localStorage.setItem('userName', userName); // Lưu trạng thái vào localStorage
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userName = null;
    localStorage.removeItem('userName'); // Xóa trạng thái khỏi localStorage
  }
}