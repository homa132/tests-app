import React from 'react';
import './finishedQuiz.css'
import Button from '../UI/Bottom/Bottom'
import {Link} from 'react-router-dom';


const FinishedQuiz = props => {
    const succesCount = Object.keys(props.resoults).reduce((total, key)=>{
        if(props.resoults[key] === 'succes'){
            total++
        }
        return total
    },0)
    return (
        <div className="finishedQuiz">
            <ul>
                {props.quiz.map((quizItem,index)=>{


                    return (
                        <li key={index}>
                            <strong>{index + 1}</strong>.&nbsp;
                            {quizItem.question}
                            <i className={props.resoults[quizItem.id] === 'error' ? 'fa  fa-times errorAnswer': 'fa  fa-check succesAnswer'}/><br/>
                        </li>
                    )
                })}
            </ul>
            <p>
                {succesCount}/{props.quiz.length}
            </p>

            <div>
                <Button onClick={props.onReturn} type='primeryBottom'>onReturn</Button>
                <Link to='/'>
                    <Button onClick={props.onReturn} type='succesBottom'>other tests</Button>
                </Link>
                

            </div>
        </div>
    )
}

export default FinishedQuiz;