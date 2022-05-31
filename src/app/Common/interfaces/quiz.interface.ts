export interface IQuiz{
    nombreCuestionario:string;
    usuario:string;
    preguntas: Array<IPregunta>;
}

export interface IPregunta{
    descripcionPregunta: string;
    opciones: Array<IOpciones>;
    page?: number;
    valorPregunta:number;
}

export interface IOpciones{
    descripcion:string;
    esRespuesta: boolean;
    // valorDePuntaje?: number; Deprecado
    controlName:string;
}


