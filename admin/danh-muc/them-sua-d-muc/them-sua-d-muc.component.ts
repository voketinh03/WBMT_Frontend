import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-them-sua-d-muc',
  templateUrl: './them-sua-d-muc.component.html',
  styleUrl: './them-sua-d-muc.component.css'
})
export class ThemSuaDMucComponent implements OnInit{
  CategoryName: string = '';
  Description: string = '';
  // submited: boolean = false;

  subjectForm: FormGroup;

constructor(private service: SharedService, 
  private router: Router,
  fb: FormBuilder
) { 
  this.subjectForm = fb.group({
    CategoryName: ['', Validators.required],
    Description: ['', Validators.required]
  });
}

ngOnInit(): void {

}

onSubmit(){
  if (/*!this.madanhmuc.trim() ||*/ !this.CategoryName.trim() || !this.Description.trim() ) {
    alert('Vui lòng điền đầy đủ tất cả các trường!');
    return;
}

const hasLetter = /[a-zA-Z]/.test(this.CategoryName);  //Kiểm tra chữ
    if (!hasLetter) {
      alert('Tên danh mục phải là chữ!');
      return;
    }

    const hasLetterMoTa = /[a-zA-Z]/.test(this.Description);  //Kiểm tra chữ
    if (!hasLetterMoTa) {
      alert('Mô tả phải là chữ!');
      return;
    }

    console.log(this.subjectForm.value);
    this.service.themDanhMuc(this.subjectForm.value).subscribe(res => {
      this.router.navigate(['/ds-d-muc']);
    });
}
}
