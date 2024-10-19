import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from '../../shared.service';
import { ActivatedRoute } from '@angular/router'; // Nhập ActivatedRoute

interface Books {
  id: number;
  title: string; // Đã sửa lỗi chính tả từ "tittle" thành "title"
  description?: string; // Thuộc tính mô tả tùy chọn
  price: number;
}

@Component({
  selector: 'app-them-sua-book',
  templateUrl: './them-sua-book.component.html',
  styleUrls: ['./them-sua-book.component.css']
})
export class ThemSuaBookComponent implements OnInit {

  Sach: Books = {
    id: 0,
    title: '',
    description: '',
    price: 0
  };

  @Input() book: Books | null = null; // Sử dụng null để chỉ định rằng book có thể không tồn tại
  isEditing: boolean = false; // Biến để xác định trạng thái

  constructor(private service: SharedService, private route: ActivatedRoute) { } // Tiêm ActivatedRoute

  ngOnInit(): void {

    // Kiểm tra xem book có hợp lệ không
    if (this.book ) {
      this.Sach.id = this.book.id;
      this.Sach.title = this.book.title;
      this.Sach.description = this.book.description;
      this.Sach.price = this.book.price;
    }
  }

  loadBookDetails(id: number): void {
      this.service.getBookById(id).subscribe(book => {
      this.Sach = book; // Giả sử cấu trúc của book phù hợp với interface Books
      console.log(this.Sach);
    }, error => {
      console.error('Lỗi khi tải thông tin sách:', error);
    });
  }

  themsach() {
    this.service.themSach(this.Sach) // Sử dụng this.Sach thay vì this.book
      .subscribe(response => {
        console.log('Sách đã được thêm thành công!', response);
        alert("Thêm thành công");
        this.resetForm();
      }, error => {
        console.error('Lỗi khi thêm sách:', error);
      });
  }
  suasach() {
    if (!this.Sach.id) {
      console.error('Không thể cập nhật sách, thiếu ID!');
      return;
    }

    const bookId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.Sach.id);

    // Gửi dữ liệu dưới dạng JSON
    this.service.suaSach(bookId, this.Sach) // Truyền this.Sach
      .subscribe(response => {
        console.log('Chỉnh sửa thành công!', response);
        alert("Sửa thành công")
        this.resetForm();
      }, error => {
        console.error('Lỗi khi cập nhật sách:', error);
      });
  }

  resetForm() {
    this.Sach = { id: 0, title: '', description: '', price: 0 };
    this.isEditing = false
  }
}
