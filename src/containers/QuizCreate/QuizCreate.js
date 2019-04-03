import React from "react";
import './QuizCreate.css';
import Botton from '../../components/UI/Bottom/Bottom'
import {createControl,validate,validateForm} from '../../form/formFramevork';
import Input from '../../components/UI/Input/Input'
import Select from '../../components/UI/select/select'
import axios from 'axios'

function createOptinContol (number){
    return createControl({
        lable:`varian ${number}`,
        errorMessage:'variant not corect',
        id: number
    },{
        required: true
    })
}


function createFormControls (){
    return {
        question: createControl({
            lable:'enter question',
            errorMessage: 'question not corect'
        }, {
            required: true
        }),
        answerOne: createOptinContol(1),
        answerTwo: createOptinContol(2),
        answerThree: createOptinContol(3),
        answerFour: createOptinContol(4)
    }
}

export default class Auth extends React.Component{

    state ={
        quiz:[],
        isFormValid:false,
        formControls:createFormControls(),
        rightAnswer: 1
    }

    submitHendler= (e) => {e.preventDefault()}

    onQuestionHendler = (e) => {
        e.preventDefault();
        const {answerOne, answerTwo, answerThree,answerFour,question} = this.state.formControls;
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const questionItem = {
            questio: question.value,
            id: index,
            right: this.state.rightAnswer,
            answers: [{text: answerOne.value, id:answerOne.id},
                        {text: answerTwo.value, id:answerTwo.id},
                        {text: answerThree.value, id:answerThree.id},
                        {text: answerFour.value, id:answerFour.id}]
            }
        quiz.push(questionItem);
        this.setState({
            quiz,
            isFormValid:false,
            formControls:createFormControls(),
            rightAnswer: '1'
            })
    }
    crateTestHendler = async (e) => {
        e.preventDefault();
        try{
            await axios.post('https://react-quiz-ea95a.firebaseio.com/quises.json', this.state.quiz);
            this.setState({
                quiz:[],
                isFormValid:false,
                formControls:createFormControls(),
                rightAnswer: '1'
                })
        }
        catch(e){
            console.log(e)
        }

    }


    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = formControls[controlName];

        control.value = value;
        control.toutched = true;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid:validateForm(formControls)
        })
    }

    renderInputs(){

        
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];

            return (
            <React.Fragment key={controlName + index}>
                <Input
                    
                    lable={control.lable}
                    value={control.value}
                    valid={control.valid}
                    shouldValidate={!!control.validation}
                    toutched={control.toutched}
                    errorMessage={control.errorMessage}
                    onChange={(event) => this.changeHandler(event.target.value, controlName)}
                    />
                {index === 0? <hr/>: null}
            </React.Fragment>
                
            )
        })
    }

    selectChangeHendler = event => {
        this.setState({
            rightAnswer: +event.target.value
        })
    }

    render(){
        const select = <Select
                            label="select the correct answer"
                            value={this.state.rightAnswer}
                            onChange={this.selectChangeHendler}
                            option={[{text:'one',value: '1'},{text:'two',value: '2'},
                                    {text:'three',value: '3' },{ text:'fouth', value: '4'}]}/>

        return(
            <div className="QuizCreate">
                <div>
                    <h1>QuizCreate</h1>
                    <form onSubmit={this.submitHendler}>
                        
                        {this.renderInputs()}

                        {select}
                        <Botton
                            type="primeryBottom"
                            onClick={this.onQuestionHendler}
                            disabled={!this.state.isFormValid}>
                            New question
                        </Botton>
                        <Botton
                            type="succesBottom"
                            onClick={this.crateTestHendler}
                            disabled={this.state.quiz.length === 0}>
                            New test
                        </Botton>
                    </form>
                </div>
                
            </div>
        )
    }
}