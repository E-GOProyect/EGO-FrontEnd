import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { URLS } from "../Common/enums";
import { Credentials, IUser } from '../Common/interfaces';

@Injectable({
    providedIn: 'root'
})
export class RegisterUserService{
    private Url=URLS.API+'/usuario';
    private subUrlRegistro='/register';
    private subUrlLogin='/login';
    

    constructor(private http:HttpClient){

    }
    
    public async registerUser(user:IUser): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.Url+this.subUrlRegistro,user)
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }
    public async loginUser(credenciales:Credentials): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.Url+this.subUrlLogin,credenciales)
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }
}