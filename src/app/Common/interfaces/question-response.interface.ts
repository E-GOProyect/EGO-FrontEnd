export interface IQuestionResponse{
    idPregunta: number;
    descripcionPregunta: string;
    opciones: Array<IOpcionesResponse>;
}

export interface IOpcionesResponse{
    idOpcion: number;
    descripcion: string;
}