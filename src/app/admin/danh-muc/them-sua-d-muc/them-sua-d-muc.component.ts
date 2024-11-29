import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../../shared.service';


@Component({
  selector: 'app-them-sua-d-muc',
  templateUrl: './them-sua-d-muc.component.html',
  styleUrl: './them-sua-d-muc.component.css'
})
export class ThemSuaDMucComponent implements OnInit{
  submited: boolean = false;
  // proAdd = this.fb.group({
  //   category_name: ['', Validators.required],
  //   description: ['', Validators.required]
  // });
  
  // tenDanhMuc: string = '';
  // moTa: string = '';
  // maDanhMuc: string = '';
  // @Input() dMuc:any;
  constructor(
    private fb: FormBuilder,
    private proSrv: SharedService,
    private _router: Router  
  ) { }

  ngOnInit(): void{
    // this.tenDanhMuc=this.dMuc.tenDanhMuc;
  }

  // get f() {return this.proAdd.controls;}
  // onSubmit(): any{
  //   this.submited = true;

  //   if(this.proAdd.invalid) {return false;}
  //   //them moi
  //   this.proSrv.themDanhMuc(this.proAdd.value).subscribe(res =>{
  //     this._router.navigate(['/danhmuc/ds-d-muc']);
  //   });
  // }


// themDanhMuc(){

//   var val= {
//     tenDanhMuc: this.tenDanhMuc,
//     moTa: this.moTa,
//     maDanhMuc: this.maDanhMuc
//   };
//   this.service.themDanhMuc(val).subscribe(res=>{
//     alert(res.toString());
//   });
// }

}