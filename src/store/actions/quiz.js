import axios from 'axios';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCES, FETCH_QUIZES_ERROR } from './actionsTypes';


export function fetchQuizes () {
    return async dispatch => {
        dispatch(fetchQuizesStart())

        try{
            const respons =  await axios.get('https://react-quiz-ea95a.firebaseio.com/quises.json');
            const quizes = [];
            Object.keys(respons.data).forEach((key, index) => {
                quizes.push({
                    id:key,
                    name: `test ${index + 1}`
                })
            })
            dispatch(fetchQuizesSucces(quizes))
        }
        catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart (){
    return {
        type:FETCH_QUIZES_START
    }
}

export function fetchQuizesSucces(quizes){
    return {
        type:FETCH_QUIZES_SUCCES,
        quizes
    }
}

export function fetchQuizesError(e){
    return {
        type:FETCH_QUIZES_ERROR,
        error: e
    }
}