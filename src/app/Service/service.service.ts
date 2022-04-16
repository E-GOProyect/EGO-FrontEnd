import { User,Credentials } from './../Common/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private Url='http://localhost:9000/usuario/login'

  constructor(private http:HttpClient) { }

  checkUser(){
    return this.http.get<User[]>(this.Url);
  }
  public login(credentials:Credentials){
    return this.http.post<Credentials>(this.Url,credentials);
  }
}
