import React from 'react';
import './Bottom.css';

const Bottom = props => {
    return (
        <button 
            onClick={props.onClick}
            className={'Bottom  ' + props.type}
            disabled={props.disabled}
                >
            {props.children}
        </button>
    )
}

export default Bottom;