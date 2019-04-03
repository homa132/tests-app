import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/finishedQuiz'
import Loader from '../../components/UI/loader/loader'
import {connect} from 'react-redux'
import {fetchQuizById} from '../../store/actions/quiz'


class Quiz extends Component{


    componentDidMount(){
        this.props.fetchQuizById(this.props.match.params.id)
        
    }



    

    onAnswerClick = (answerId) => {
            if(this.state.answerState){
                const key = this.state.answerState;
                if(key[answerId] === 'succes'){
                    return 
                }
               
            }
        

        const question = this.state.quiz[this.state.activeQuestion];
        const resoults = this.state.resoults;
        if(question.right === answerId){
            if(!resoults[question.id]){
                resoults[question.id]='succes'
            }
            this.setState({
                answerState: {[answerId]:'succes'},
                resoults
            })

            const timeout = window.setTimeout(()=> {
                if(this.quizFunish()){
                    this.setState({
                        isFinish: true
                    })
                }
                else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }

                window.clearTimeout(timeout)
            }, 1000)

            
        }else{
            resoults[question.id]='error'
            this.setState({
                answerState: {[answerId]:'error'},
                resoults
            })
        }
        
    }
    onReturn =()=> {
        this.setState({
            resoults:{},
            isFinish: false,
            activeQuestion:0,
            answerState: null,
        })
    }
    quizFunish(){
        return this.state.activeQuestion + 1 === this.state.quiz.length
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
                                onAnswerClick={this.onAnswerClick}
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
        
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Quiz) ;