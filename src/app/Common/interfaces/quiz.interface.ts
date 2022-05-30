export interface IQuiz{
    nombreCuestionario:string;
    usuario:string;
    preguntas: Array<IPregunta>;
}

export interface IPregunta{
    descripcionPregunta: string;
    opciones: Array<IOpciones>;
}

export interface IOpciones{
    descripcion:string;
    esRespuesta: boolean;
    valorDePuntaje?: number;
}

export interface IShowQuestion{
    question: IPregunta;
    page: number;
}
