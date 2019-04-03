import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/finishedQuiz'
import Loader from '../../components/UI/loader/loader'
import {connect} from 'react-redux'
import {fetchQuizById, onAnswerClick,onReturnQuest} from '../../store/actions/quiz'


class Quiz extends Component{


    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id)
        
    }

    componentWillUnmount(){
        this.props.onReturnQuest()
    }
    onAnswerClicks = (answerId) => {
            this.props.onAnswerClick(answerId)
        
    }
    
    onReturn = () => {
        console.log(this.props.onReturnQuest)
        this.props.onReturnQuest()
    }
    
    render(){
        return (
            <div className="Quiz">
                <div className="QuizWrapper">
                    <h1>Questions</h1>

                    {this.props.loading
                        ?<Loader/>
                    : this.props.isFinish 
                            ? <FinishedQuiz
                                    resoults={this.props.resoults}
                                    quiz={this.props.quiz}
                                    onReturn={this.onReturn}/>
                            : <ActiveQuiz answers={this.props.quiz[this.props.activeQuestion].answers}
                                question={this.props.quiz[this.props.activeQuestion].questio}
                                onAnswerClick={this.onAnswerClicks}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion}
                                answerState={this.props.answerState}/>}

                    
                </div>
                
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        resoults:state.quiz.resoults,
        isFinish: state.quiz.isFinish,
        activeQuestion:state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz:state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        onAnswerClick: (answerId) => dispatch(onAnswerClick(answerId)),
        onReturnQuest: () => dispatch(onReturnQuest())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz) ;