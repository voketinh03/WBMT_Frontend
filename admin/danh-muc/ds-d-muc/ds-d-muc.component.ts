import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ds-d-muc',
  templateUrl: './ds-d-muc.component.html',
  styleUrl: './ds-d-muc.component.css'
})

export class DsDMucComponent implements OnInit {
    
    constructor(private service: SharedService,
      private toastr: ToastrService,
      private router: Router
    ) { }

    DSDanhMuc:any=[];
    dMuc:any;
    dangThemSua: boolean=false;

    ngOnInit(): void{
      this.taiLaiDSDanhMuc();
      console.log(this.taiLaiDSDanhMuc());
    }

    taiLaiDSDanhMuc(){
       this.service.layDSDanhMuc().subscribe(data => {
        this.DSDanhMuc = data;
       })
    }

    chiTietDanhMuc(dMuc:any){
        this.dMuc= dMuc;
        this.dangThemSua=true;
    }

    xoaDanhMuc(item: any): void {
      if (confirm(`Bạn có chắc chắn muốn xóa khách hàng ${item.category_name}?`)) {
        this.service.xoaDanhMuc(item.category_id).subscribe(
         
          (response: any) => {
          //  console.log('API response:', response); // Log phản hồi từ API
            if (response?.status === 'success') {
              alert("Xóa danh mục thành công!");
              this.taiLaiDSDanhMuc();
               // Tải lại danh sách sau khi xóa
            } else {
              alert('Không thể xóa danh mục');
            }
          },
          (error: any) => {
            console.error('Lỗi khi xóa khách hàng:', error);
            this.toastr.error('Xảy ra lỗi trong quá trình xoá danh mục');
          }
        );
      }
    }
}​