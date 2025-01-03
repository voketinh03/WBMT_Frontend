import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface SanPham {
  id: number;
  title: string;
  description?: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "https://localhost:7267/api";

  constructor(private http: HttpClient) { }

  layDSSach(): Observable<SanPham[]> {
    return this.http.get<any[]>(`${this.APIUrl}/SanPham`);
  }

  themSach(val: SanPham): Observable<any> {
    return this.http.post<any>(`${this.APIUrl}/SanPham`, val);
  }

  suaSach(id: number, val: SanPham): Observable<SanPham> {
    return this.http.put<any>(`${this.APIUrl}/SanPham/${id}`, val);
  }

  xoaSach(id: number): Observable<any> {
    return this.http.delete<any>(`${this.APIUrl}/SanPham/${id}`);
  }

  getSachById(id: number): Observable<SanPham> {
    return this.http.get<SanPham>(`${this.APIUrl}/SanPham/${id}`);
  }
}