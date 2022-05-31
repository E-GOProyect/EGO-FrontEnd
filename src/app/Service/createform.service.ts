import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { resolve } from 'dns';
import { URLS } from "../Common/enums";
import { IQuiz } from '../Common/interfaces/quiz.interface';

@Injectable({
    providedIn: 'root'
})
export class CreateFormService{
    private Url=URLS.API+'/cuestionario/crear';
    constructor(private http:HttpClient){

    }

    public createForm(completeForm:IQuiz): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.Url,completeForm).pipe().subscribe((res)=>{
                resolve(res);
            });
        })
    }
}