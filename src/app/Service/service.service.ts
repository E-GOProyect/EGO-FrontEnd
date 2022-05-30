import { Credentials } from './../Common/interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URLS } from '../Common/enums';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private Url=URLS.API+'/cuestionario/crear';

  constructor(private http:HttpClient) { }

  public login(credentials:Credentials){
    return this.http.post<Credentials>(this.Url,credentials);
  }
}
