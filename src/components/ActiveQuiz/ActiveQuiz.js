import React from 'react'
import classes from './ActiveQuiz.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = (props) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>1. </strong>
                How are you?
            </span>
            <small>4 / 10</small>
        </p>
        
        <AnswersList answers={props.answers} />
    </div>
);

export default ActiveQuiz