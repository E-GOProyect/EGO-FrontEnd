import { headers } from './../Common/constants/allow-header-request.constants';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { URLS } from "../Common/enums";
import { IResponse, IUserCredentials, IUserRegister } from '../Common/interfaces';

@Injectable({
    providedIn: 'root'
})
export class UserService{
    private Url=URLS.API+'/usuario';
    private subUrlRegistro='/register';
    private subUrlLogin='/login';
    private subUrlCreateGuest='/crear-invitado';

    constructor(private http:HttpClient){

    }
    
    public async registerUser(user:IUserRegister): Promise<IResponse>{
        return new Promise<IResponse>((resolve)=>{
            this.http.post<any>(this.Url+this.subUrlRegistro,user)
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }
    public async loginUser(credenciales:IUserCredentials): Promise<IResponse>{
        return new Promise<IResponse>((resolve)=>{
            this.http.post<any>(this.Url+this.subUrlLogin,credenciales,{headers})
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }

    public async registerGuest(nickname:string): Promise<IResponse>{
        return new Promise<IResponse>((resolve)=>{
            this.http.post<any>(this.Url+this.subUrlCreateGuest,{username:nickname})
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }
}