import { useEffect, useState } from 'react';

import axios from 'axios';

import { Answer, Question, QuestionAnswer } from '../models'

import './Questions.scss'

function Questions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [questionAnswers, setQuestionAnswers] = useState<QuestionAnswer[]>([]);
    const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<Answer[]>([]);
  
    useEffect(() => {
        axios.get('/api/questions').then(({data}) => {
            setQuestions(data);
            const { id } = data[currentQuestion-1];
            axios.get(`/api/questions/${id}`).then(({data}) => {
                setCurrentQuestionAnswers(data.answers);
            });
      });
    }, []);

    const choseQuestionAnswer = (id: number, answerOption: string) => {
        const questionIndex = questionAnswers.findIndex(q => q.id === id);
        if (questionIndex > -1)
            questionAnswers[questionIndex].answerOption  = answerOption;
        else
            setQuestionAnswers([...questionAnswers, {id, answerOption}]);
    };

    const resetRadios = (fromPrev = false) => {
        const radioElements = document.querySelectorAll(`[id^="radio-"]`);
        const currentQuestionAnswer = questionAnswers.find(q => q.id === currentQuestion + (!fromPrev ? 1 : -1));
        radioElements.forEach((radioElement) => {
            const radio = (radioElement as HTMLInputElement);
            if (currentQuestionAnswer && radioElement.id.includes(currentQuestionAnswer.answerOption))
                radio.checked = true;
            else
                radio.checked = false;
        });
    };

    const nextQuestion = () => {
        setCurrentQuestion((prevQuestionId) => prevQuestionId + 1);
        axios.get(`/api/questions/${currentQuestion+1}`).then(({data}) => {
            setCurrentQuestionAnswers(data.answers);
        });
        resetRadios();
    }

    const previousQuestion = () => {
        setCurrentQuestion((prevQuestionId) => prevQuestionId - 1);
        axios.get(`/api/questions/${currentQuestion-1}`).then(({data}) => {
            setCurrentQuestionAnswers(data.answers);
        });
        resetRadios(true);
    }

    const shouldDisableNext = () => {
        return questionAnswers.findIndex(q => q.id === currentQuestion) === -1
            || !questionAnswers.length
    };
    
    const shouldHideNext = () => {
        return currentQuestion === questions[questions.length-1]?.id;
    }

    const shouldHidePrevious = () => {
        return currentQuestion !== 1;
    }

    return (
        <div className="Questions container" data-testid='questions'>
            <p className='italic'>Question {currentQuestion} of {questions.length}</p>
            <h3>
                {questions[currentQuestion-1]?.title}
            </h3>
            <p className='italic'>All questions are required</p>
            <ul className='list-group'>
                {currentQuestionAnswers.map(answer => (
                    <li className='list-group-item' key={answer.option}>
                        <input
                            className="form-check-input me-1 hand"
                            type="radio"
                            name="listGroupRadio"
                            value=""
                            id={'radio-' + answer.option}
                            defaultChecked={false}
                            onClick={() => choseQuestionAnswer(currentQuestion, answer.option)}
                            data-testid={`question-${answer.option}`}
                             />
                        <label
                            className="form-check-label hand"
                            htmlFor={'radio-' + answer.option}
                            data-testid={`question-label-${answer.option}`}>
                                {answer.option} - {answer.title}
                        </label>
                    </li>
                ))}
            </ul>
            <br />
            <div className="d-flex gap-2">
                {shouldHidePrevious() && <button
                        type='button'
                        className='btn btn-lg btn-primary'
                        onClick={previousQuestion}
                        data-testid='prev-button'>
                        Previous question
                    </button>
                }
                {!shouldHideNext() && <button
                        type='button'
                        disabled={shouldDisableNext()}
                        className='btn btn-lg btn-primary'
                        onClick={nextQuestion}
                        data-testid='next-button'>
                        Next question
                    </button>
                }
                {shouldHideNext() && <button
                        type='button'
                        disabled={shouldDisableNext()}
                        className='btn btn-lg btn-primary'
                        onClick={() => console.log('Finishing test')}
                        data-testid='finish-button'>
                        Finish test
                    </button>
                }
            </div>
        </div>
    );
}

export default Questions;