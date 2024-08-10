import time
from flask import Flask

from questions import QUESTIONS

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/questions')
def get_all_questions():
    # get all questions
    questions = []
    for question in QUESTIONS:
        question_view = question.copy()
        question_view.pop('answers')
        questions.append(question_view)
    return questions


@app.route('/questions/<int:question_id>')
def get_question(question_id):
    # get question with the given id
    return next((q for q in QUESTIONS if q['id'] == question_id), None) or {}, 404
