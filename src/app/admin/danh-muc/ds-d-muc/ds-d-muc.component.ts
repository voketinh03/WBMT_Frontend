import { Component, OnInit } from '@angular/core';

import { SharedService } from '../../../shared.service';

@Component({
  selector: 'app-ds-d-muc',
  templateUrl: './ds-d-muc.component.html',
  styleUrl: './ds-d-muc.component.css'
})

export class DsDMucComponent implements OnInit {
    
    constructor(private service: SharedService) { }

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


}​