import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url : string = 'http://127.0.0.1:8000/';

  constructor(private http : Http) { }

  uploadphoto(photo: any): Observable<any>{
  return this.http.post<any>(`${this.url}`, photo);
  }

}
