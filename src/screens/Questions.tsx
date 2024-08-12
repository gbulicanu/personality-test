import { useEffect, useState } from 'react';

import axios from 'axios';

import { Question, Answer } from '../models'

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
                            id={'radio-' + answer.option} defaultChecked={false}
                             />
                        <label
                            className="form-check-label hand"
                            htmlFor={'radio-' + answer.option}>{answer.option} - {answer.title}
                        </label>
                    </li>
                ))}
            </ul>
            <br />
            <div className="d-grid gap-2">
                <button type='button' className='btn btn-lg btn-primary' onClick={() => console.log('Next')}>
                    Next question
                </button>
            </div>
        </div>
    );
}

export default Questions;