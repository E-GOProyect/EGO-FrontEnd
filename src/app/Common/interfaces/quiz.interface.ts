export interface IQuiz{
    nombreCuestionario:string;
    usuario:string;
    preguntas: Array<IPregunta>;
}

export interface IPregunta{
    descripcionPregunta: string;
    opciones: Array<IOpciones>;
    page?: number;
}

export interface IOpciones{
    descripcion:string;
    esRespuesta: boolean;
    valorDePuntaje?: number;
    controlName:string;
}


