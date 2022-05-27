export interface IRespuestaCard{
    resNum: number;
    isCorrect: boolean;
}

export interface IListRespuesta{
    resList: Array<IRespuesta>;
}
export interface IRespuesta{
    description: string;
    points?: number;
}