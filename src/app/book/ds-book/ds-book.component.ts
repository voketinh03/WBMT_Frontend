import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router';

interface Books {
  id: number;
  title: string; // Đã sửa lỗi chính tả từ "tittle" thành "title"
  description?: string; // Thuộc tính mô tả tùy chọn
  price: number;
}
@Component({
  selector: 'app-ds-book',
  templateUrl: './ds-book.component.html',
  styleUrl: './ds-book.component.css'
})

export class DsBookComponent implements OnInit {
  constructor(private service: SharedService, private route: ActivatedRoute) { }
  DSSach: any;
  book: any;
  dangThemSua: boolean = false;
  titilemodal: any
  ngOnInit(): void {
    this.taiLaiDSSach()
  }
  taiLaiDSSach() {
    this.service.layDSSach().subscribe(data => {
      this.DSSach = data;
    })
  }
  chitietsach(book: any) {
    this.titilemodal = "Chỉnh sửa sách";
    this.book = book;
    this.dangThemSua = true;
  }
  dong() {
    this.dangThemSua = false;
    this.taiLaiDSSach()
  }
  themsach() {
    this.book = null;
    this.dangThemSua = true;
    this.titilemodal = "Thêm sách";
  }

  xoasach(id: Books) {
    this.service.xoaSach(id.id).subscribe(
      response => {
        alert('Xóa sách thành công!');
        this.taiLaiDSSach(); // Tải lại danh sách sách sau khi xóa
      },
      error => {
        console.error('Lỗi khi xóa sách:', error);
      }
    );
  }


}
  

