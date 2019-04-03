import axios from 'axios';
import { FETCH_QUIZES_START, FETCH_QUIZES_SUCCES, FETCH_QUIZES_ERROR,
    FETCH_QUIZ_START, FETCH_QUIZ_SUCCES, FETCH_QUIZ_ERROR, QUESTION_CLASS
,FINISH_QUIZ,ANSWER_QUESTION,RETURN_QUESTION_LIST} from './actionsTypes';


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

export function fetchQuizById(id){
    return async dispatch => {
        dispatch(fetchQuizStart())
        try{
            const respons  = await axios.get(`https://react-quiz-ea95a.firebaseio.com/quises/${id}.json`);
            const quiz =  respons.data;
            dispatch(fetchQuizSucces(quiz))
            
            }catch(e){
                dispatch(fetchQuizError(e))
            }



    }
}

export function fetchQuizStart (){
    return{
        type: FETCH_QUIZ_START
    }
}

export function fetchQuizSucces(quiz){
    return {
        type: FETCH_QUIZ_SUCCES,
        quiz
    }
}

export function fetchQuizError (e){
    return {
        type: FETCH_QUIZ_ERROR,
        error: e
    }
}

export function chandeClass(answerState , resoults){
    return {
        type:  QUESTION_CLASS,
        answerState, resoults
    }
}

export function finishQuiz (){
    return {
        type: FINISH_QUIZ
    }
}

export function newActiveQuestion(activeQuestion){
    return {
        type:ANSWER_QUESTION,
        activeQuestion
    }
}

export function onAnswerClick (answerId){
    return (dispatch, getState) => {
        const state = getState().quiz;
        if(state.answerState){
            const key = state.answerState;
            if(key[answerId] === 'succes'){
                return 
            }
           
        }
    
       let quizFunish = () => {
            return state.activeQuestion + 1 === state.quiz.length
        }
    const question = state.quiz[state.activeQuestion];
    const resoults = state.resoults;
    if(question.right === answerId){
        if(!resoults[question.id]){
            resoults[question.id]='succes'
        }

        dispatch(chandeClass({[answerId]:'succes'},resoults))

        const timeout = window.setTimeout(()=> {
            if(quizFunish()){
                dispatch(finishQuiz())

                // this.setState({
                //     isFinish: true
                // })
            }
            else {
                dispatch(newActiveQuestion(state.activeQuestion + 1))
                // this.setState({
                //     activeQuestion: state.activeQuestion + 1,
                //     answerState: null
                // })
            }

            window.clearTimeout(timeout)
        }, 1000)

        
    }else{
        resoults[question.id]='error';
        dispatch(chandeClass({[answerId]:'error'},resoults))
    }
    }
}

export function onReturnQuest(){
    return {
        type: RETURN_QUESTION_LIST
    }
}