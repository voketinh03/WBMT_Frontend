import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Book {
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

  layDSSach(): Observable<Book[]> { // Chỉnh sửa kiểu trả về để phù hợp
    return this.http.get<Book[]>(this.APIUrl + '/Books');
  }

  themSach(val: Book): Observable<any> {
    return this.http.post<any>(this.APIUrl + '/Books', val);
  }

  suaSach(id: number, val: Book): Observable<Book> {
    console.log(val.id)
    return this.http.put<Book>(`${this.APIUrl}/Books/${val.id}`, val);
  }

  xoaSach(id: number): Observable<Book> {
    return this.http.delete<Book>(`${this.APIUrl}/Books/${id}`); // Sửa URL để thêm dấu "/"
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.APIUrl}/Books/${id}`);
  }
}
