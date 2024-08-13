import json
import pytest

from api.app import app

@pytest.fixture
def client():
    """Configures the app for testing

    Sets app config variable ``TESTING`` to ``True``

    :return: App for testing
    """

    app.config['TESTING'] = True
    client = app.test_client()

    yield client


def test_questions(client):
    response = client.get("/api/questions")
    # print(response.data)
    assert len(json.loads(response.data)) == 5


def test_time(client):
    response = client.get("/api/time")
    # print(response.data)
    data = json.loads(response.data)
    assert data['time'] is not None


@pytest.mark.parametrize("question_id", [1, 2, 3, 4, 5])
def test_question(client, question_id):
    response = client.get(f"/api/questions/{question_id}")
    # print(response.data)
    data = json.loads(response.data)
    assert data['answers'] is not None


def test_post_answers(client):
    response = client.post("/api/answers", json=
    [{
        "id": 1,
        "answerOption": "A"
    },
    {
        "id": 2,
        "answerOption": "A"
    },
    {
        "id": 3,
        "answerOption": "D"
    },
    {
        "id": 4,
        "answerOption": "D"
    },
    {
        "id": 5,
        "answerOption": "D"
    }])
    # print(response.data)
    data = json.loads(response.data)
    # print(data)
    assert data['summary'] is not None
    assert data['description'] is not None