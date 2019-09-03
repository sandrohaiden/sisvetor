import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {url}  from '../config.json';

@Injectable({
  providedIn: 'root'
})
export class SubitemService {

  subitens: [];
  url: string = `${url}/subitens`;

  constructor(private http: HttpClient) { }

  getAll(){
    console.log(url);
    return this.http.get(this.url);
  }

  post(body: any){
    console.log("Esse é o body:" + body);
    return this.http.post(this.url, body);
  }

  put(body: any){
    console.log("Esse é o body:" + body);
    console.log(body);
    return this.http.put(`${this.url}/${body.id}`, body);
  }

  delete(body: any){
    console.log("Esse é o body:" + body);
    console.log(body);
    return this.http.delete(`${this.url}/${body.id}`, body);
  }
  
  findByNome(nome: string){
    return this.http.get(`${this.url}/search?nome=${nome}`);
  }
}
