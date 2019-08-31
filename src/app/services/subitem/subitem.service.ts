import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubitemService {

  subitens: [];
  url: string = 'http://127.0.0.1:8080/api/subitens';

  constructor(private http: HttpClient) { }

  getAll(){
    return this.http.get(this.url);
  }

  post(body: any){
    console.log("Esse é o body:" + body);
    return this.http.post(this.url, body);
  }
}
