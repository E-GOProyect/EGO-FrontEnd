import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { getQuizForm } from "../Common/constants/quiz-form.constants";
import { URLS } from "../Common/enums";
import { IQuiz } from "../Common/interfaces";
import { CreateLounge } from "../Common/interfaces/crear-lounge.interface";

@Injectable({
    providedIn: 'root'
})
export class CuestionarioService{
    /**
     * ? Para revisar todos los cuentionarios revisar el siguiente LINK:
     * * https://ego-forms-backend.herokuapp.com/api/v1.0.0/egoforms/cuestionario 
     */
    private urlQuiz=URLS.API+'/cuestionario';
    private urlCrearQuiz=this.urlQuiz+'/crear';
    private urlEditar=this.urlQuiz+'/editar';
    private urlCreateLounge=URLS.API+'/sala-cuestionario/crear-sala';
    private urlValidCodeLounge=URLS.API+'/sala-cuestionario/validar-codigo';

    constructor(private http:HttpClient){

    }

    public async createQuiz(quiz: IQuiz): Promise<any>{
        const quizClear= getQuizForm(quiz);
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.urlCrearQuiz,quizClear)
            .pipe()
            .subscribe((res)=>{
                console.log(".CreateQuiz ~ res", res);
                resolve(res);
            })
        })
    }
    public async createLounge(loungeData: CreateLounge): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.post<any>(this.urlCreateLounge,loungeData)
            .pipe()
            .subscribe((res)=>{
                console.log(".createLounge ~ res", res);
                resolve(res);
            })
        })
    }
    public async validateLounge(code: string): Promise<any>{
        return new Promise<any>((resolve)=>{
            this.http.get<any>(this.urlValidCodeLounge,{params: {codigo: code}})
            .pipe()
            .subscribe((res)=>{
                console.log(".createLounge ~ res", res);
                resolve(res);
            })
        })
    }
}