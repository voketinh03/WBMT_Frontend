import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

interface SanPham {
  id: number;
  title: string;
  description?: string;
  price: number;
}

@Component({
  selector: 'app-ds-book',
  templateUrl: './ds-book.component.html',
  styleUrls: ['./ds-book.component.css']
})
export class DsBookComponent implements OnInit {
  DSSach: SanPham[] = [];
  SanPham: SanPham | null = null;
  dangThemSua: boolean = false;
  titilemodal: string = '';

  constructor(private service: SharedService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.taiLaiDSSach();
    console.log(this.taiLaiDSSach());
  }

  taiLaiDSSach(): void {
    this.service.layDSSach().subscribe(
      data => {
        this.DSSach = data;
      },
      
      error => {
        console.error('Lỗi khi tải danh sách sản phẩm:', error);
      }
    );
    
  }

  chitietsach(SanPham: SanPham): void {
    this.titilemodal = "Chỉnh sửa đơn hàng";
    this.SanPham = SanPham;
    this.dangThemSua = true;
  }

  dong(): void {
    this.dangThemSua = false;
    this.taiLaiDSSach();
  }

  themsach(): void {
    this.SanPham = null;
    this.dangThemSua = true;
    this.titilemodal = "Thêm đơn hàng";
  }

  xoaSach(SanPham: SanPham): void {
    if (SanPham && SanPham.id) {
      this.service.xoaSach(SanPham.id).subscribe(
        () => {
          alert('Xóa sách thành công!');
          this.taiLaiDSSach();
        },
        error => {
          console.error('Lỗi khi xóa sách:', error);
        }
      );
    }
  }
}