import React from 'react';
import './Input.css'

const validInput = (props) => {
    const {toutched,valid,shouldValidate} = props;
    return !valid && toutched && shouldValidate
}


const Input = props => {
    const  inputType = props.type || 'text';
    const htmlFor = `${inputType}-${Math.random()}`;

    return (
        <div className={ `${validInput(props)? 'Input  invalidInput' : 'Input '} + ${props.class}`}>
            <label 
                    htmlFor={htmlFor}>{props.lable}</label>
            <input 
                    type={inputType} 
                    id={htmlFor}
                    value={props.value}
                    onChange={props.onChange}/>
            {validInput(props)
            ?<span>{props.errorMessage}</span>
            :null}        
            
        </div>
    )
}

export default Input;