import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  //chuyển ddooori 
  private isLoggedInSource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSource.asObservable();

  customerData(customerId: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl: string = 'http://localhost:5144/api';

  constructor(private http: HttpClient) {}
  
  updateLoginStatus(status: boolean) {
    console.log('Cập nhật trạng thái đăng nhập:', status);
    this.isLoggedInSource.next(status);
  }
  

  dangNhap(nDung: any):Observable<any[]>{
    return this.http.post<any>(this.apiUrl+'/UserModels/dangnhap', nDung);
  }
  
  dangKy(dky: any):Observable<any[]>{
    return this.http.post<any>(this.apiUrl+'/ReUsersModels/dangky', dky);
  }
  //Dùng list ds màn hình Admin
  GetTT(): Observable<any> {
   return this.http.get<any>(this.apiUrl+'/CustomerModels/GetThongTin');
  }
  // Dùng xem full kh 
  GetTTKH(): Observable<any> {
    // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
    return this.http.get<any>(this.apiUrl+'/CustomerModels/GetThongTin');
   }
   // Dùng xem chi tiết 1 kh
    GetTTCTKH(Id: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}/CustomerModels/GetTTCTid/${Id}`);
    }
    // Dùng xem full lsdh 
   GetLSDH(): Observable<any> {
    // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
    return this.http.get<any>(this.apiUrl+'/OrderHistoryModels/Lichsudonhang');
   }
   GetOrderDetail(customerId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/OrderHistoryModels/Lichsudonhang/${customerId}`);
}

   // Dùng cập nhật ttkh
    UpdateKH(Id: number, customerData: any): Observable<any> {
      return this.http.put<any>(`${this.apiUrl}/CustomerModels/UpdateCustome/${Id}`,customerData);
    }
    DeleteCustomer(customerId: number): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/CustomerModels/DeleteCustomer/${customerId}`);
  }
// Làm việc với danh mục 
  layDSDanhMuc():Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'/Categories');
  }

  themDanhMuc(val:any){
    return this.http.post<any>(this.apiUrl+'/Danhmuc',val);
  }

  suaDanhMuc(val:any){
    return this.http.put<any>(this.apiUrl+'/Danhmuc',val);
  }

  xoaDanhMuc(val:any){
    return this.http.delete<any>(this.apiUrl+'/Danhmuc/'+val);
  }

  taiAnh(val:any): Observable<any[]>{
    return this.http.get<any>(this.apiUrl);
  }

  //Làm việc với sản phẩm 
  // dangKy(dky: any):Observable<any[]>{
  //   return this.http.post<any>(this.apiUrl+'/ReUsersModels/dangky', dky);
  // }
  addProduct(product: any): Observable<any> {
    return this.http.post<any>(this.apiUrl+'/Products',product);
  }

  //  GetTT(): Observable<any> {
 //  return this.http.get<any>(this.apiUrl+'/CustomerModels/GetThongTin');
 // }
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl+'/Products');
  }
  getProductById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/Products/${id}`);
  }

  // DeleteCustomer(customerId: number): Observable<any>{
  //   return this.http.delete<any>(`${this.apiUrl}/CustomerModels/DeleteCustomer/${customerId}`);
  // }
  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Products/${id}`);
  }
}
