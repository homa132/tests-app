import { FETCH_QUIZES_START,FETCH_QUIZES_SUCCES,FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START, FETCH_QUIZ_SUCCES, FETCH_QUIZ_ERROR,QUESTION_CLASS,FINISH_QUIZ,ANSWER_QUESTION,RETURN_QUESTION_LIST } from '../actions/actionsTypes';


const initialState = {
    quizes: [],
    loader: false,
    error: null,
    resoults:{},
    isFinish: false,
    activeQuestion:0,
    answerState: null,
    quiz:null,
    loading: true
}

export default function quizReducer(state = initialState, action){
    switch(action.type){
        case FETCH_QUIZES_START:
            return {
                ...state, loader: true
            }
        case FETCH_QUIZES_SUCCES:
            return {
                ...state,
                loader: false,
                quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loader: false, error: action.error
            }
        case FETCH_QUIZ_START:
            return{
                ...state, loading: true
            }
        case FETCH_QUIZ_SUCCES:
            return {
                ...state, quiz: action.quiz, loading: false
            }
        case FETCH_QUIZ_ERROR:
            return{
                ...state, error:action.error
            }
        case QUESTION_CLASS: 
            return {
                ...state, answerState:action.answerState,resoults: action.resoults
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinish: true
            }
        case ANSWER_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            }
        case RETURN_QUESTION_LIST:
            return{
                ...state,resoults:{},
                isFinish: false,
                activeQuestion:0,
                answerState: null,
            }
        default:
            return state
    }
   

}