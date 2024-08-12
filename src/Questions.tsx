import { useEffect, useState } from 'react';
import { Question, Answer } from './models'
import './Questions.scss'

function Questions() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(1);
    const [currentQuestionAnswers, setCurrentQuestionAnswers] = useState<Answer[]>([]);
  
    useEffect(() => {
      fetch('/api/questions').then(res => res.json()).then(data => {
        setQuestions(data);
        fetch(`/api/questions/${data[0]?.id}`).then(res => res.json()).then(({answers}) => {
            setCurrentQuestionAnswers(answers);
        });
      });
    }, []);
    
    return (
        <div className="Questions container" data-testid='questions'>
            <h1>Question {currentQuestion} of {questions.length}</h1>
            <h4>
                {questions[currentQuestion-1]?.title}
            </h4>
            <ul className='list-group'>
                {currentQuestionAnswers.map(answer => (
                    <li className='list-group-item' key={answer.option}>
                        <input className="form-check-input me-1" type="radio" name="listGroupRadio" value="" id={'radio-' + answer.option} checked={false} />
                        <label className="form-check-label" htmlFor={'radio-' + answer.option}>{answer.option} - {answer.title}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Questions;