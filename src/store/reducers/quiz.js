import { FETCH_QUIZES_START,FETCH_QUIZES_SUCCES,FETCH_QUIZES_ERROR } from '../actions/actionsTypes';


const initialState = {
    quizes: [],
    loader: false,
    error: null
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


        default:
            return state
    }
   

}