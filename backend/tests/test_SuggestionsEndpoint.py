import pytest
from app import app

@pytest.fixture
def client():
    app.config.update({'TESTING': True})
    with app.test_client() as client:
        yield client

def test_suggestions_no_query(client):
    res = client.get('/textures/suggestions')
    assert res.data == b'[]\n'
    assert res.status_code == 200

def test_suggestions_query(client):
    data = {
        'search': 'green',
        'limit': 5
    }
    res = client.get('/textures/suggestions', query_string=data)
    assert len(res.data) > 0
    assert res.data != b'[]\n'
    assert res.status_code == 200
    