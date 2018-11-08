import React from 'react';
import classes from './ActiveQuiz.css';
import AnswersList from './AnswersList/AnswersList'

const AcriveQuiz = (props) => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>1.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        <AnswersList
            state={props.state}
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
        />
    </div>

);


export default AcriveQuiz;