import React from 'react';
import './ActiveQuiz.css'

import AnswersList from './AnswersList/AnswersList'
const ActiveQuiz = props => {

    return (
        <div className="ActiveQuiz">
            <p className="Question">
                <span>
                    <strong>2.</strong> &nbsp;
                    {props.question}
                </span>
                <small>{props.answerNumber + 1}/{props.quizLength}</small>
            </p>
            
            <AnswersList answers={props.answers} 
                         onAnswerClick={props.onAnswerClick}
                         answerState={props.answerState}/>
        </div>
    )
}

export default ActiveQuiz;