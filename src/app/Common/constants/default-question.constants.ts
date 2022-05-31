import { IOpciones, IPregunta } from "../interfaces"

export const defaultQuestion = (controlName:string, page?:Number)=>{
    const numberPage= page? page:1;
    const question= {
        descripcionPregunta: '',
        page: numberPage,
        opciones:[
            defaultOpcion(true,controlName+'1'),
            defaultOpcion(false,controlName+'2'),
        ]
    } as IPregunta;
    return question
}

export const defaultOpcion = (isCorrect:boolean, formName:string)=>{
    return {
        descripcion:'',
        esRespuesta:isCorrect,
        valorDePuntaje: isCorrect? 100:0,
        controlName:formName
    } as IOpciones;
}