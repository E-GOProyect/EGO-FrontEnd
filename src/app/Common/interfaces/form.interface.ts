export interface IForm{
    nombreCuestionario:string;
    usuario:string;
    preguntas: Array<IPregunta>;
}

export interface IPregunta{
    idPregunta: string;
    descripcionPregunta: string;
    opciones: Array<IOpciones>;
}

export interface IOpciones{
    idOpcion: string;
    descripcion:string;
    esRespuesta: boolean;
}   
