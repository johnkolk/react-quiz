import React, { Component } from "react";
import classes from "./Quiz.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
    state = {
        results: {}, // {[id]: success/error}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]: 'success'/'error'}
        quiz: [
            {
                id: 1,
                question: "Как найти работу?",
                rightAnswerId: 2,
                answers: [
                    { id: 1, text: "Составить резюме" },
                    { id: 2, text: "Искать на фрилансе" },
                    { id: 3, text: "Просто" },
                    { id: 4, text: "Пойти на завод" },
                ],
            },
            {
                id: 2,
                question: "Это второй вопрос?",
                rightAnswerId: 2,
                answers: [
                    { id: 1, text: "Да" },
                    { id: 2, text: "Нет" },
                    { id: 3, text: "Я не знаю" },
                    { id: 4, text: "Вопрос?" },
                ],
            },
        ],
    };

    onAnswerClickHandler = (answerId) => {

        // fix двойной клик по правильному ответу
        // если кликаем несколько раз по правильному ответу - просто выходим
        if (this.state.answerState){
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success'){
                return
            }
        }

        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;

        if (question.rightAnswerId === answerId) {

            if (!results[question.id]) {
                results[question.id] = "success";
            }
            

            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });

            const timeout = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    
                    this.setState({
                        isFinished: true
                    })
                    
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    });
                }
                window.clearTimeout(timeout);
            }, 1000);

        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: { [answerId]: "error" },
                results
            });
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
        })
    };

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Answer the questions</h1>

                    {this.state.isFinished ? (
                        <FinishedQuiz 
                            results={this.state.results}
                            quiz={this.state.quiz}
                            onRetry={this.retryHandler}
                        />
                    ) : (
                        <ActiveQuiz
                            answers={
                                this.state.quiz[this.state.activeQuestion]
                                    .answers
                            }
                            question={
                                this.state.quiz[this.state.activeQuestion]
                                    .question
                            }
                            onAnswerClick={this.onAnswerClickHandler}
                            quizLength={this.state.quiz.length}
                            questionNumber={this.state.activeQuestion + 1}
                            state={this.state.answerState}
                        />
                    )}
                </div>
            </div>
        );
    }
}

export default Quiz;
