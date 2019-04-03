import React, {Component} from 'react';
import './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/finishedQuiz/finishedQuiz'
import axios from 'axios';
import Loader from '../../components/UI/loader/loader'

class Quiz extends Component{


    async componentDidMount(){
        try{
        const respons  = await axios.get(`https://react-quiz-ea95a.firebaseio.com/quises/${this.props.match.params.id}.json`);
        const quiz =  respons.data;
        this.setState({
            quiz,
            loading: false
        })
        }catch(e){
            console.log(e)
        }
        
    }



    state ={
        resoults:{

        },
        isFinish: false,
        activeQuestion:0,
        answerState: null,
        quiz:[],
        loading: true
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

                    {this.state.loading
                        ?<Loader/>
                    : this.state.isFinish 
                            ? <FinishedQuiz
                                    resoults={this.state.resoults}
                                    quiz={this.state.quiz}
                                    onReturn={this.onReturn}/>
                            : <ActiveQuiz answers={this.state.quiz[this.state.activeQuestion].answers}
                                question={this.state.quiz[this.state.activeQuestion].questio}
                                onAnswerClick={this.onAnswerClick}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion}
                                answerState={this.state.answerState}/>}

                    
                </div>
                
            </div>
        )
    }
}

export default Quiz;