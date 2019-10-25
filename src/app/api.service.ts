import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import { Upfile } from './model/upfile';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url : string = 'http://127.0.0.1:8000/';

  constructor(private http1 : Http,private http: HttpClient) { }

  uploadphoto(photo: Upfile): Observable<Upfile>{
  return this.http.post<Upfile>(`${this.url}`, photo);
  }

}
