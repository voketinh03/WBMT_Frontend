import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private apiUrl: string = 'https://localhost:7044/api';

  constructor(private https: HttpClient) {}

  dangNhap(nDung: any):Observable<any[]>{
    return this.https.post<any>(this.apiUrl+'/UserModels/dangnhap', nDung);
  }
  
  dangKy(dky: any):Observable<any[]>{
    return this.https.post<any>(this.apiUrl+'/ReUsersModels/dangky', dky);
  }
  // GetTT(laythongtin: any):Observable<any[]>{
  //   return this.https.post<any>(this.apiUrl+'/CustomerModels/GetThongTin', laythongtin);
  // }
  GetTT(): Observable<any> {
   // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
   return this.https.get<any>(this.apiUrl+'/CustomerModels/GetThongTin');
  }
  GetTTKH(): Observable<any> {
    // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
    return this.https.get<any>(this.apiUrl+'/CustomerModels/GetTTCT');
   }

   GetLSDH(): Observable<any> {
    // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
    return this.https.get<any>(this.apiUrl+'/OrderHistoryModels/Lichsudonhang');
   }

   GetTTCT(id: string): Observable<any> {
    // return this.https.get<any>('${this.apiUrl}/CustomerModels/GetThongTin');
    // return this.https.get<any>(this.apiUrl+'/CustomerModels/GetTTCTid/');
    return this.https.get<any>('${this.apiUrl}/CustomerModels/GetTTCT/${id}');
   }

}

