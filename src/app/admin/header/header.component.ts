import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false; 
  userName: string  | null = null;
  router: any;

  // Inject SharedService trong constructor
  constructor(private sharedService: SharedService, router: Router ) {}

  ngOnInit() {
    this.sharedService.isLoggedIn$.subscribe((status: boolean) => {
      console.log('Trạng thái đăng nhập:', status);
      this.isLoggedIn = status;
  
      if (status) {
        this.userName = localStorage.getItem('userName');
        console.log('Lấy userName từ localStorage:', this.userName);
      }
    });
  }
  
  logout() {
    // Xóa thông tin đăng nhập
    localStorage.removeItem('userName');
    this.sharedService.updateLoginStatus(false); // Cập nhật trạng thái đăng xuất
    window.location.href = "/login"; // Điều hướng đến trang đăng nhập
  }
  goToProfile(): void {
    this.router.navigate(['/profile']); // Điều hướng đến trang profile
  }
}
