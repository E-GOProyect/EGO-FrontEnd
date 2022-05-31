import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getQuizForm } from "../Common/constants/quiz-form.constants";
import { URLS } from "../Common/enums";
import { IQuiz } from "../Common/interfaces";

@Injectable({
    providedIn: 'root'
})
export class CuestionarioService{
    /**
     * ? Para revisar todos los cuentionarios revisar el siguiente LINK:
     * * https://ego-forms-backend.herokuapp.com/api/v1.0.0/egoforms/cuestionario 
     */
    private Url=URLS.API+'cuestionario';
    private subUrlCrear=this.Url+'/crear';
    private subUrleditar=this.Url+'/editar';

    constructor(private http:HttpClient){

    }

    public async createQuiz(quiz: IQuiz): Promise<any>{
        const quizClear= getQuizForm(quiz);
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.subUrlCrear,quizClear)
            .pipe()
            .subscribe((res)=>{
                console.log(".subscribe ~ res", res);
                resolve(res);
            })
        })
    }
}