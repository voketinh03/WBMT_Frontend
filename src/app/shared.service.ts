import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { Observable,throwError } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class SharedService {
//     readonly APIUrl = "https://localhost:7044/api";
//   constructor( private https:HttpClient) { }
//   dangnhap(val: any):Observable<any[]>{
//     return this.https.post<any>(this.APIUrl+'/UserModels/dangnhap', val);
//   }
// }
// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

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
  
    // dangKy(registrationData: any):Observable<any[]>{
    //   return this.https.post<any>(this.apiUrl+'/UserModels/dangky', registrationData);
  // dangky(credentials: any): Observable<any> {
  //   return this.https.post<any>(`${this.APIUrl}/UserModels`, credentials);
  // }
  }

