import time
from flask import Flask, request

from api.questions import QUESTIONS
from api.personality import INTROVERT, EXTROVERT

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/questions')
def get_all_questions():
    # get all questions
    questions = []
    for question in QUESTIONS:
        question_view = question.copy()
        question_view.pop('answers')
        questions.append(question_view)
    return questions


@app.route('/api/questions/<int:question_id>')
def get_question(question_id):
    # get question with the given id
    question = next((q for q in QUESTIONS if q['id'] == question_id), None)
    if question is None:
        return {}, 404
    else:
        question_view = { 'answers': [] }
        for q in question['answers']:
            question_view['answers'].append({'option': q['option'], 'title': q['title']})
        return question_view
    
@app.route('/api/answers', methods=['POST'])
def calculate_trait():
    i, e = 0, 0
    answers = request.get_json()
    for answer in answers:
        question = next((q for q in QUESTIONS if q['id'] == answer['id']))
        answer_scores = next((a for a in question['answers'] if a['option'] == answer['answerOption']))
        i += answer_scores['i']
        e += answer_scores['e']
    if i > e:
        return INTROVERT, 200
    elif i < e:
        return EXTROVERT, 200
    else:
        # TODO provide ambivert trait
        return EXTROVERT, 200
