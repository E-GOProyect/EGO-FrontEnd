export interface IQuiz{
    nombreCuestionario:string;
    usuario:string;
    preguntas: Array<IPregunta>;
}

export interface IPregunta{
    descripcionPregunta: string;
    valorPregunta:number;
    opciones: Array<IOpciones>;
    page?: number;
}

export interface IOpciones{
    descripcion:string;
    esRespuesta: boolean;
    // valorDePuntaje?: number; Deprecado
    controlName:string;
}


