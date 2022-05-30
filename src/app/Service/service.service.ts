import { IUserCredentials } from './../Common/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from '../Common/enums';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private Url=URLS.API+'/cuestionario/crear';

  constructor(private http:HttpClient) { }

  public login(userCredentials:IUserCredentials){
    return this.http.post<IUserCredentials>(this.Url,userCredentials);
  }
}
