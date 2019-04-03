import React from "react";
import './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/loader/loader'
import { connect } from "react-redux";
import {fetchQuizes} from '../../store/actions/quiz'


 class QuizList extends React.Component{
    

    renderQuizes(){
        
        return this.props.quizes.map((quiz) =>{ 
            return(
            <li key={quiz.id}>
                <NavLink to={"/quiz/" + quiz.id}>
                    {quiz.name}
                </NavLink>
            </li>
        )})
    }

    

    async componentDidMount(){
        this.props.fetchQuizes()
        
    }

    render(){
        return(
            <div className="QuizList">
                <div>
                    <h1>List</h1>
                    {this.props.loader && this.props.quizes.length !== 0? <Loader/>
                    :<ul>
                        {this.renderQuizes()}
                    </ul>}
                    
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        quizes: state.quiz.quizes,
        loader: state.quiz.loader
    }
}

function mapDispatchToProps(dispatch){
    return {
        fetchQuizes : () => dispatch(fetchQuizes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)