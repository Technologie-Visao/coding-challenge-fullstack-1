import json


def test_texture_suggestions_valid_search_term_and_limit(client):
    response = client.get('/textures/suggestions?search_term=test&limit=5')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)


def test_texture_suggestions_invalid_search_term(client):
    response = client.get('/textures/suggestions?search_term=t')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []


def test_texture_suggestions_no_search_term(client):
    response = client.get('/textures/suggestions')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data == []


def test_texture_suggestions_custom_limit(client):
    response = client.get('/textures/suggestions?search_term=test&limit=3')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) <= 3


def test_get_all_textures(client):
    response = client.get('/textures')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    for texture in data:
        assert 'name' in texture
        assert 'description' in texture
        assert 'thumbnail_url' in texture
