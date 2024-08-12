import { useEffect, useState } from 'react';

import axios from 'axios';

import { Question, Answer } from './models'

import './Questions.scss'

function Questions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<Answer[]>([]);
  
    useEffect(() => {
        axios.get('/api/questions').then(({data}) => {
            setQuestions(data);
            const { id } = data[currentQuestion-1];
            axios.get(`/api/questions/${id}`).then(({data}) => {
            setCurrentQuestionAnswers(data.answers);
        });
      });
    }, [currentQuestion]);
    
    return (
        <div className="Questions container" data-testid='questions'>
            <h1>Question {currentQuestion} of {questions.length}</h1>
            <h4>
                {questions[currentQuestion-1]?.title}
            </h4>
            <ul className='list-group'>
                {currentQuestionAnswers.map(answer => (
                    <li className='list-group-item' key={answer.option}>
                        <input
                            className="form-check-input me-1"
                            type="radio"
                            name="listGroupRadio"
                            value=""
                            id={'radio-' + answer.option} checked={false}
                            onChange={() => console.log('on change')} />
                        <label
                            className="form-check-label"
                            htmlFor={'radio-' + answer.option}>{answer.option} - {answer.title}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Questions;