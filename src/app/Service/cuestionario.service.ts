import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { URLS } from "../Common/enums";

@Injectable({
    providedIn: 'root'
})
export class CuestionarioService{
    /**
     * ? Para revisar todos los cuentionarios revisar el siguiente LINK:
     * * https://ego-forms-backend.herokuapp.com/api/v1.0.0/egoforms/cuestionario 
     */
    private Url=URLS.API+'/cuestionario';
    private subUrlCrear=this.Url+'/crear';
    private subUrleditar=this.Url+'/editar';

    constructor(private http:HttpClient){

    }

    public async createQuiz(): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.subUrlCrear,'')
            .pipe()
            .subscribe((res)=>{
                resolve(res);
            })
        })
    }
}