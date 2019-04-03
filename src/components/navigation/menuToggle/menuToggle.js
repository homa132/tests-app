import React from 'react';
import './menuToggle.css'

const MenuToggle = props => {
    return (
        <i className={ props.isOpen? 'fa fa-times open menuToggle': 'fa fa-bars menuToggle'}
            onClick={props.onToggle}/>
    )
}

export default MenuToggle