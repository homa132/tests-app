import React ,{Component} from 'react';
import './Drawer.css';
import BackDrop from '../../UI/BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'
const links = [
   {to:'/', lable: 'List', exact: true},
   {to:'/auth', lable: 'auth', exact: false},
   {to:'/quiz-creator', lable: 'quiz-creator', exact: false}
]   

export default class Drawer extends Component{

    clickHendler = () => {
        this.props.onClose()
    }

    renderLinks(){
        return links.map((link, index) => {
            return(
                <li key={index}>
                    <NavLink 
                        to={link.to}
                        exact={link.exact}
                        activeClassName={'LinkListActive'}
                        >
                        <span onClick={this.clickHendler}>
                            {link.lable}
                        </span>
                        
                    </NavLink>
                </li>
            )
        })
    }

    render(){
        

        return(
            <React.Fragment>
                <nav className={this.props.open? 'Drawer ': 'Drawer closeMenu'}>
                    <ul>
                        {this.renderLinks()}
                    </ul>
                </nav>
                {this.props.open? <BackDrop onClick={this.props.onClose}/>: null}
                
            </React.Fragment>

           
        )
    }
}