export interface IQuizResponse {
    jugadores: Array<IPlayersResponse>,
    numeroDePreguntas: number,
    tituloCuestionario: string
}

export interface IPlayersResponse{
    apellidos: string,
    cantidadPuntos: number,
    idUsuario: string,
    nombres: string,
    puntosRecientes: number,
    tipoJugador: string,
    username: string,
}