import React from "react";
import './Auth.css'
import Button from '../../components/UI/Bottom/Bottom'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios';




export default class Auth extends React.Component{


    state = {
        isFormValid:false,
        formControls: {
            email:{
                value: '',
                type: 'email',
                lable: 'Email',
                errorMessage: 'correct email',
                valid: false,
                toutched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password:{
                value: '',
                type: 'password',
                lable: 'Password',
                errorMessage: 'correct password',
                valid: false,
                toutched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }


    loginHandler = async () =>{
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const respons =  await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAyQT3RO9BoGgt_lUBOXl0Wj4uw9PbndyM',authData)
            console.log(respons.data)
        }
        catch(e){
            console.log(e)
        }
    }
    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        }
        try{
            const respons =  await axios.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAyQT3RO9BoGgt_lUBOXl0Wj4uw9PbndyM',authData)
            console.log(respons.data)
        }
        catch(e){
            console.log(e)
        }
    }

    validateControl(value, validation){
        if(!validation){
            return true
        }
        let isValid = true;
        
        if(validation.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(validation.email){
            isValid = is.email(value) && isValid;
        }
        if(validation.minLength){
            isValid = value.length >= validation.minLength && isValid;
        }
        return isValid;
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = formControls[controlName];
        control.value = event.target.value;
        control.toutched = true;
        control.valid = this.validateControl(control.value, control.validation);

        let isFormValid = true;

        Object.keys(formControls).forEach(name =>{
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls: formControls,
            isFormValid
        })
        
    }

    submitHandler = event => {event.preventDefault()}

    renderInputs = () => {
        const inputs = Object.keys(this.state.formControls).map((constolName, index) =>{
            const control = this.state.formControls[constolName];
            return (
                <Input
                        key={constolName + index}
                        type={control.type}
                        value={control.value}
                        valid={control.valid}
                        toutched={control.toutched}
                        lable={control.lable}
                        shouldValidate={!!control.validation}
                        errorMessage={control.errorMessage}
                        onChange={(event) => this.onChangeHandler(event, constolName)}
                        />
            )
        })


        return inputs;
    }


    render(){
        return(
            <div className="Auth">
                <div>
                    <h1>Autorithation</h1>

                    <form onSubmit={this.submitHandler} className="AuthForm">
                        
                        {this.renderInputs()}

                        <Button type="succesBottom" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Login</Button>
                        <Button type="primeryBottom" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Register</Button>
                    </form>
                </div>
                
            </div>
        )
    }
}