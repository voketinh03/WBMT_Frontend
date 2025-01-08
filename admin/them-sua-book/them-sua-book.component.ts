// import { Component, OnInit, Input } from '@angular/core';
// import { SharedService } from '../../shared.service';
// import { ActivatedRoute } from '@angular/router';

// interface SanPham {
//   id: number;
//   title: string;
//   description?: string;
//   price: number;
// }

// @Component({
//   selector: 'app-them-sua-book',
//   templateUrl: './them-sua-book.component.html',
//   styleUrls: ['./them-sua-book.component.css']
// })
// export class ThemSuaBookComponent implements OnInit {

//   sanPham: SanPham = {
//     id: 0,
//     title: '',
//     description: '',
//     price: 0
//   };

//   @Input() SanPham: SanPham | null = null;
//   isEditing: boolean = false;

//   constructor(private service: SharedService, private route: ActivatedRoute) { }

//   ngOnInit(): void {
//     // Kiểm tra nếu SanPham được truyền từ component cha
//     if (this.SanPham) {
//       this.sanPham = { ...this.SanPham }; // Sao chép dữ liệu để tránh sửa trực tiếp vào input
//       this.isEditing = true;
//     }
//     const id = Number(this.route.snapshot.paramMap.get('id'));
//     if (id && !this.SanPham) {
//       this.loadBookDetails(id); // Tải sản phẩm khi có ID trong URL
//     }
//   }

//   loadBookDetails(id: number): void {
//     this.service.getSachById(id).subscribe((sanPham: SanPham) => {
//       this.sanPham = sanPham;
//       console.log('Thông tin sả phẩm:', this.sanPham);
//     }, (error: any) => {
//       console.error('Lỗi khi tải thông tin sản phẩm:', error);
//     });
//   }

//   themsach() {
//     this.service.themSach(this.sanPham).subscribe(response => {
//       console.log('Sản phẩm đã được thêm thành công!', response);
//       alert("Thêm thành công");
//       this.resetForm();
//     }, error => {
//       console.error('Lỗi khi thêm sản phẩm:', error);
//     });
//   }

//   suasach() {
//     if (!this.sanPham.id) {
//       console.error('Không thể cập nhật sản phẩm, thiếu ID!');
//       return;
//     }

//     this.service.suaSach(this.sanPham.id, this.sanPham).subscribe(response => {
//       console.log('Chỉnh sửa thành công!', response);
//       alert("Sửa thành công");
//       this.resetForm();
//     }, error => {
//       console.error('Lỗi khi cập nhật sản phẩm:', error);
//     });
//   }

//   resetForm() {
//     this.sanPham = { id: 0, title: '', description: '', price: 0 };
//     this.isEditing = false;
//   }
// }
