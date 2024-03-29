import { IQuiz } from "../interfaces";

export const getQuizForm= (quiz: IQuiz)=>{
    const questionsList= quiz.preguntas.map((ques)=>{
        return {
            descripcionPregunta: ques.descripcionPregunta,
            opciones: ques.opciones,
            valorPregunta: ques.valorPregunta,
        }
    })
    return{
        nombreCuestionario:quiz.nombreCuestionario,
        usuario:quiz.usuario,
        preguntas: questionsList,
    }
}